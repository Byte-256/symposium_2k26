'use client';

import { useMemo, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

const DEFAULT_C_CODE = `#include <stdio.h>

int main() {
  printf("Hello from TinyCC (experimental)\\n");
  return 0;
}
`;

const TCC_WASM_URL = 'https://cdn.jsdelivr.net/gh/lupyuen/tcc-riscv32-wasm@main/tcc-wasm.wasm';

function createWasmImports(log) {
  const noop = () => 0;
  return {
    env: {
      print: (value) => log(`print: ${value}`),
      abort: () => {
        throw new Error('TinyCC wasm aborted');
      },
    },
    wasi_snapshot_preview1: {
      fd_close: noop,
      fd_fdstat_get: noop,
      fd_read: noop,
      fd_seek: noop,
      fd_write: noop,
      path_open: noop,
      path_unlink_file: noop,
      proc_exit: noop,
      environ_get: noop,
      environ_sizes_get: noop,
      clock_time_get: noop,
      random_get: noop,
    },
  };
}

function writeCString(memory, ptr, text) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  const bytes = new Uint8Array(memory.buffer);
  bytes.set(encoded, ptr);
  bytes[ptr + encoded.length] = 0;
  return encoded.length + 1;
}

export default function TinyCcExperimentalRunner() {
  const [code, setCode] = useState(DEFAULT_C_CODE);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [language, setLanguage] = useState('c');
  const instanceRef = useRef(null);

  const editorLanguage = useMemo(
    () => (language === 'c' ? languages.c : languages.cpp),
    [language],
  );

  const ensureTinyCc = async (log) => {
    if (instanceRef.current) {
      return instanceRef.current;
    }

    const response = await fetch(TCC_WASM_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch TinyCC wasm: HTTP ${response.status}`);
    }

    const bytes = await response.arrayBuffer();
    const imports = createWasmImports(log);
    const { instance } = await WebAssembly.instantiate(bytes, imports);
    instanceRef.current = instance;
    return instance;
  };

  const compileCode = async () => {
    setIsCompiling(true);
    const logs = [];
    const pushLog = (line) => {
      logs.push(line);
      setOutput(logs.join('\n'));
    };

    try {
      pushLog('Loading TinyCC wasm...');
      const instance = await ensureTinyCc(pushLog);
      const exports = instance.exports || {};

      if (typeof exports.compile_program !== 'function') {
        throw new Error('TinyCC export `compile_program` not found.');
      }
      if (typeof exports.malloc !== 'function') {
        throw new Error('TinyCC export `malloc` not found (cannot pass source/options).');
      }
      if (!exports.memory) {
        throw new Error('TinyCC export `memory` not found.');
      }

      const memory = exports.memory;
      const options = JSON.stringify(['-c', 'hello.c']);

      const codePtr = exports.malloc(code.length + 1);
      const optionsPtr = exports.malloc(options.length + 1);
      writeCString(memory, codePtr, code);
      writeCString(memory, optionsPtr, options);

      pushLog('Compiling with TinyCC...');
      const resultPtr = exports.compile_program(optionsPtr, codePtr);

      if (typeof exports.free === 'function') {
        exports.free(codePtr);
        exports.free(optionsPtr);
      }

      if (!resultPtr) {
        throw new Error('Compilation failed: compile_program returned null/0 pointer.');
      }

      const size = new DataView(memory.buffer).getUint32(resultPtr, true);
      if (!Number.isFinite(size) || size < 0 || size > 20 * 1024 * 1024) {
        throw new Error(`Compilation produced invalid output size: ${size}`);
      }

      pushLog(`TinyCC compile success.`);
      pushLog(`Produced output blob: ${size} bytes (ELF object).`);
      pushLog('Note: this TinyCC integration currently compiles only; execution is still handled by JSCPP above.');
    } catch (error) {
      const message = error?.message || String(error);
      pushLog(`TinyCC error: ${message}`);
      pushLog('This is an experimental integration and may need a custom TinyCC wasm wrapper build.');
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5">
      <div>
        <h2 className="text-xl font-semibold text-amber-300">TinyCC (Experimental)</h2>
        <p className="mt-1 text-sm text-amber-200/80">
          Attempts to load a TinyCC WebAssembly build and compile the source to object output.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-300" htmlFor="tinycc-language">
          Language
        </label>
        <select
          id="tinycc-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400/60"
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50"
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(text) => highlight(text, editorLanguage)}
          padding={12}
          className="min-h-[260px]"
        />
      </div>

      <button
        onClick={compileCode}
        disabled={isCompiling}
        className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCompiling ? 'Compiling...' : 'Compile with TinyCC'}
      </button>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">TinyCC Output</h4>
        <pre className="min-h-[140px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'TinyCC logs will appear here...'}
        </pre>
      </div>
    </div>
  );
}
