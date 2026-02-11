'use client';

import { useMemo, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';
import * as JSCPPModule from 'JSCPP';

const STARTER_C_CODE = `int putchar(int);

int main() {
  putchar('O');
  putchar('K');
  putchar('\\n');
  return 0;
}
`;

const TINYCC_STDIO_DECLS = `/* stdio.h */
int printf(const char *fmt, ...);
int scanf(const char *fmt, ...);
int puts(const char *s);
int putchar(int c);
int getchar(void);
`;

const TINYCC_STDLIB_DECLS = `/* stdlib.h */
void *malloc(unsigned long size);
void free(void *ptr);
void *calloc(unsigned long n, unsigned long size);
void *realloc(void *ptr, unsigned long size);
int atoi(const char *nptr);
long atol(const char *nptr);
double atof(const char *nptr);
int rand(void);
void srand(unsigned int seed);
int abs(int n);
long labs(long n);
void exit(int status);
`;

const TINYCC_STRING_DECLS = `/* string.h */
void *memcpy(void *dest, const void *src, unsigned long n);
void *memmove(void *dest, const void *src, unsigned long n);
void *memset(void *s, int c, unsigned long n);
int strcmp(const char *s1, const char *s2);
int strncmp(const char *s1, const char *s2, unsigned long n);
char *strcpy(char *dest, const char *src);
char *strncpy(char *dest, const char *src, unsigned long n);
char *strcat(char *dest, const char *src);
char *strncat(char *dest, const char *src, unsigned long n);
unsigned long strlen(const char *s);
char *strchr(const char *s, int c);
char *strstr(const char *haystack, const char *needle);
`;

const TINYCC_MATH_DECLS = `/* math.h */
double sin(double x);
double cos(double x);
double tan(double x);
double asin(double x);
double acos(double x);
double atan(double x);
double atan2(double y, double x);
double sqrt(double x);
double pow(double x, double y);
double fabs(double x);
double floor(double x);
double ceil(double x);
double log(double x);
double exp(double x);
double fmod(double x, double y);
`;

const TINYCC_CTYPE_DECLS = `/* ctype.h */
int isalpha(int c);
int isdigit(int c);
int isalnum(int c);
int isspace(int c);
int tolower(int c);
int toupper(int c);
`;

const TINYCC_TIME_DECLS = `/* time.h */
typedef long __tinycc_time_t;
__tinycc_time_t time(__tinycc_time_t *tloc);
double difftime(__tinycc_time_t time1, __tinycc_time_t time0);
`;

const TINYCC_STDINT_DECLS = `/* stdint.h */
typedef signed char int8_t;
typedef unsigned char uint8_t;
typedef short int16_t;
typedef unsigned short uint16_t;
typedef int int32_t;
typedef unsigned int uint32_t;
typedef long long int64_t;
typedef unsigned long long uint64_t;
`;

const TINYCC_STDBOOL_DECLS = `/* stdbool.h */
typedef _Bool bool;
#define true 1
#define false 0
`;

const TINYCC_HEADER_SHIMS = {
  'stdio.h': TINYCC_STDIO_DECLS,
  'stdlib.h': TINYCC_STDLIB_DECLS,
  'string.h': TINYCC_STRING_DECLS,
  'math.h': TINYCC_MATH_DECLS,
  'ctype.h': TINYCC_CTYPE_DECLS,
  'time.h': TINYCC_TIME_DECLS,
  'stdint.h': TINYCC_STDINT_DECLS,
  'stdbool.h': TINYCC_STDBOOL_DECLS,
};

function getJsCppRuntime() {
  const runtime = JSCPPModule?.default || JSCPPModule;
  if (runtime && typeof runtime.run === 'function') {
    return runtime;
  }
  return null;
}

function maybeExitMessage(message) {
  const lower = message.toLowerCase();
  return lower.includes('program exited') || lower.includes('status: 0');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toTinyCcCompatibleSource(sourceCode) {
  let source = String(sourceCode ?? '');
  const shimmedHeaders = [];

  for (const headerName of Object.keys(TINYCC_HEADER_SHIMS)) {
    const pattern = new RegExp(`^\\s*#\\s*include\\s*<${escapeRegExp(headerName)}>\\s*$`, 'gm');
    const next = source.replace(pattern, '');
    if (next !== source) {
      shimmedHeaders.push(headerName);
      source = next;
    }
  }

  if (shimmedHeaders.length > 0) {
    const shimCode = shimmedHeaders.map((header) => TINYCC_HEADER_SHIMS[header]).join('\n');
    return {
      source: `${shimCode}\n${source}`,
      shimmedHeaders,
    };
  }

  return {
    source,
    shimmedHeaders,
  };
}

export default function TccCompileRunPanel({
  initialCode = STARTER_C_CODE,
  runButtonLabel = 'Compile & Run',
}) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef(null);
  const runtime = useMemo(() => getJsCppRuntime(), []);

  const getWorker = () => {
    if (workerRef.current) {
      return workerRef.current;
    }
    workerRef.current = new Worker('/workers/tccWorker.js', { type: 'module' });
    return workerRef.current;
  };

  const compileWithTcc = (sourceCode) =>
    new Promise((resolve, reject) => {
      const worker = getWorker();
      const handleMessage = (event) => {
        const data = event.data || {};
        if (data.type !== 'compiled') {
          return;
        }
        worker.removeEventListener('message', handleMessage);
        if (data.ok) {
          resolve(data);
          return;
        }
        reject(new Error(data.stderr || 'TinyCC compilation failed.'));
      };
      worker.addEventListener('message', handleMessage);
      worker.postMessage({ type: 'compile', code: sourceCode });
    });

  const runCode = async () => {
    if (!runtime) {
      setOutput('JSCPP runtime failed to load.');
      return;
    }

    setIsRunning(true);
    setOutput('Compiling with TinyCC...');

    try {
      const { source: tinyCcSource, shimmedHeaders } = toTinyCcCompatibleSource(code);
      const compileResult = await compileWithTcc(tinyCcSource);

      let stdout = '';
      const exitCode = runtime.run(String(code || ''), String(stdin || ''), {
        stdio: {
          write: (chunk) => {
            stdout += String(chunk ?? '');
          },
        },
      });

      const chunks = [
        'TinyCC compile: success',
        shimmedHeaders.length > 0
          ? `TinyCC note: used built-in header shims for ${shimmedHeaders.join(', ')}.`
          : '',
        compileResult.stderr?.trim() ? `TinyCC diagnostics:\n${compileResult.stderr.trim()}` : '',
        stdout ? `Program stdout:\n${stdout.trimEnd()}` : 'Program stdout:\n<empty>',
        `[exit code: ${exitCode}]`,
      ].filter(Boolean);

      setOutput(chunks.join('\n\n'));
    } catch (error) {
      const message = error?.message || String(error);
      if (maybeExitMessage(message)) {
        setOutput('TinyCC compile: success');
      } else {
        setOutput(`TinyCC compile failed:\n${message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">TinyCC Compile + Run</h2>
        <p className="mt-1 text-sm text-slate-400">
          Compiles with `tcc-wasm` first, then runs source in-browser and prints stdout.
        </p>
      </div>

      <div
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50"
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(text) => highlight(text, languages.c)}
          padding={12}
          className="min-h-[320px]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="tcc-stdin">
          Program Input (stdin)
        </label>
        <textarea
          id="tcc-stdin"
          value={stdin}
          onChange={(event) => setStdin(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.05]"
          placeholder="Optional stdin"
        />
      </div>

      <button
        onClick={runCode}
        disabled={isRunning}
        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRunning ? 'Compiling & Running...' : runButtonLabel}
      </button>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Output</h4>
        <pre className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'Output will appear here...'}
        </pre>
      </div>
    </div>
  );
}
