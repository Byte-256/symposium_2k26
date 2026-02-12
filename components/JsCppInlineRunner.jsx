'use client';

import { useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import * as JSCPPModule from 'JSCPP';

const C_STDIO_DECLS = `/* stdio.h */
int printf(const char *fmt, ...);
int scanf(const char *fmt, ...);
int puts(const char *s);
int putchar(int c);
int getchar(void);
`;

const C_STDLIB_DECLS = `/* stdlib.h */
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

const C_STRING_DECLS = `/* string.h */
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

const C_MATH_DECLS = `/* math.h */
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

const C_CTYPE_DECLS = `/* ctype.h */
int isalpha(int c);
int isdigit(int c);
int isalnum(int c);
int isspace(int c);
int tolower(int c);
int toupper(int c);
`;

const C_TIME_DECLS = `/* time.h */
typedef long __shim_time_t;
__shim_time_t time(__shim_time_t *tloc);
double difftime(__shim_time_t time1, __shim_time_t time0);
`;

const C_STDINT_DECLS = `/* stdint.h */
typedef signed char int8_t;
typedef unsigned char uint8_t;
typedef short int16_t;
typedef unsigned short uint16_t;
typedef int int32_t;
typedef unsigned int uint32_t;
typedef long long int64_t;
typedef unsigned long long uint64_t;
`;

const C_STDBOOL_DECLS = `/* stdbool.h */
typedef _Bool bool;
#define true 1
#define false 0
`;

const C_HEADER_SHIMS = {
  'stdio.h': C_STDIO_DECLS,
  'stdlib.h': C_STDLIB_DECLS,
  'string.h': C_STRING_DECLS,
  'math.h': C_MATH_DECLS,
  'ctype.h': C_CTYPE_DECLS,
  'time.h': C_TIME_DECLS,
  'stdint.h': C_STDINT_DECLS,
  'stdbool.h': C_STDBOOL_DECLS,
};

const CPP_HEADER_SHIMS = {
  string: '',
};

function getJsCppRuntime() {
  const candidate = JSCPPModule?.default || JSCPPModule;
  if (candidate && typeof candidate.run === 'function') {
    return candidate;
  }
  return null;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyHeaderShims(sourceCode) {
  let source = String(sourceCode ?? '');
  const shimmedHeaders = [];

  for (const headerName of Object.keys(C_HEADER_SHIMS)) {
    const pattern = new RegExp(`^\\s*#\\s*include\\s*<${escapeRegExp(headerName)}>\\s*$`, 'gm');
    const next = source.replace(pattern, '');
    if (next !== source) {
      shimmedHeaders.push(headerName);
      source = next;
    }
  }

  if (shimmedHeaders.length === 0) {
    return { source, shimmedHeaders, shimLineCount: 0 };
  }

  const shimCode = shimmedHeaders.map((headerName) => C_HEADER_SHIMS[headerName]).join('\n');
  return {
    source: `${shimCode}\n${source}`,
    shimmedHeaders,
    shimLineCount: shimCode.split('\n').length,
  };
}

function applyCppCompatShims(sourceCode) {
  let source = String(sourceCode ?? '');
  const shimmedHeaders = [];

  for (const headerName of Object.keys(CPP_HEADER_SHIMS)) {
    const pattern = new RegExp(`^\\s*#\\s*include\\s*<${escapeRegExp(headerName)}>\\s*$`, 'gm');
    const next = source.replace(pattern, '');
    if (next !== source) {
      shimmedHeaders.push(headerName);
      source = next;
    }
  }

  if (shimmedHeaders.includes('string')) {
    // JSCPP does not provide std::string. This keeps simple string literal programs runnable.
    source = source.replace(/\bstd::string(?=\s+[A-Za-z_]\w*)/g, 'const char*');
    source = source.replace(/\bstring(?=\s+[A-Za-z_]\w*)/g, 'const char*');
  }

  return { source, shimmedHeaders };
}

function parseErrorLocation(message) {
  const text = String(message ?? '');
  const pegMatch = text.match(/line\s+(\d+)\s+\(column\s+(\d+)\)/i);
  if (pegMatch) {
    return { line: Number(pegMatch[1]), column: Number(pegMatch[2]) };
  }

  const ccStyle = text.match(/^(\d+):(\d+)\s+/);
  if (ccStyle) {
    return { line: Number(ccStyle[1]), column: Number(ccStyle[2]) };
  }

  const ccLineOnly = text.match(/^(\d+):\s+/);
  if (ccLineOnly) {
    return { line: Number(ccLineOnly[1]), column: null };
  }

  return null;
}

function formatCompilerLikeError(error, sourceCode, shimLineCount = 0) {
  const raw = String(error?.message || error || 'Unknown error');
  const location = parseErrorLocation(raw);
  if (!location) {
    return `Compilation/runtime error:\n${raw}`;
  }

  const adjustedLine = Math.max(1, location.line - shimLineCount);
  const lines = String(sourceCode ?? '').split('\n');
  const sourceLine = lines[adjustedLine - 1] ?? '';
  const caretColumn = location.column && location.column > 0 ? location.column : 1;
  const caret = `${' '.repeat(Math.max(0, caretColumn - 1))}^`;

  const header =
    location.column != null
      ? `error:${adjustedLine}:${location.column}`
      : `error:${adjustedLine}`;

  return `${header}\n${sourceLine}\n${caret}\n\n${raw}`;
}

export default function JsCppInlineRunner({
  initialCode,
  initialInput = '',
  initialLanguage = 'cpp',
  runButtonLabel = 'Compile & Run',
  showStdin = true,
  showLanguageSelector = true,
}) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialInput);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);

  const runtime = useMemo(() => getJsCppRuntime(), []);
  const editorLanguage = useMemo(
    () => (language === 'c' ? languages.c : languages.cpp),
    [language],
  );

  const runCode = () => {
    if (!runtime) {
      setOutput('Runtime failed to load: JSCPP.run is unavailable in this build.');
      return;
    }

    setIsRunning(true);
    let shimLineCount = 0;
    try {
      const { source: cShimmedSource, shimmedHeaders, shimLineCount: detectedShimLineCount } =
        applyHeaderShims(code);
      const { source: shimmedSource, shimmedHeaders: cppShimmedHeaders } =
        applyCppCompatShims(cShimmedSource);
      shimLineCount = detectedShimLineCount;
      let stdout = '';
      const exitCode = runtime.run(String(shimmedSource || ''), String(stdin || ''), {
        stdio: {
          write: (chunk) => {
            stdout += String(chunk ?? '');
          },
        },
      });

      const chunks = [
        shimmedHeaders.length > 0 ? `C header shims applied: ${shimmedHeaders.join(', ')}` : '',
        cppShimmedHeaders.length > 0
          ? `C++ compat shims applied: ${cppShimmedHeaders.join(', ')} (std::string -> const char*)`
          : '',
        stdout,
        `[exit code: ${exitCode}]`,
      ].filter(Boolean);

      setOutput(chunks.join('\n').trim());
    } catch (error) {
      setOutput(formatCompilerLikeError(error, code, shimLineCount));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      {showLanguageSelector && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300" htmlFor="jscpp-language">
            Language
          </label>
          <select
            id="jscpp-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      )}

      <div
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50"
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(text) => highlight(text, editorLanguage)}
          padding={12}
          className="min-h-[320px]"
        />
      </div>

      {showStdin && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="jscpp-stdin">
            Program Input (stdin)
          </label>
          <textarea
            id="jscpp-stdin"
            value={stdin}
            onChange={(event) => setStdin(event.target.value)}
            className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.05]"
            placeholder="Example: 7"
          />
        </div>
      )}

      <button
        onClick={runCode}
        disabled={isRunning}
        className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRunning ? 'Running...' : runButtonLabel}
      </button>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">stdout</h4>
        <pre className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'stdout/stderr will appear here...'}
        </pre>
      </div>
    </div>
  );
}
