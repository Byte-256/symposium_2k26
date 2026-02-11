import TccFactory from '/vendor/tcc-wasm/tcc.js';

const decoder = new TextDecoder();

function normalizeInput(input) {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof Uint8Array) {
    return decoder.decode(input);
  }
  return String(input ?? '');
}

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.type !== 'compile') {
    return;
  }

  const code = normalizeInput(data.code);
  let index = 0;
  let stdout = '';
  let stderr = '';

  try {
    await TccFactory({
      arguments: ['-w', '-c', '-'],
      stdin: () => (index < code.length ? code.charCodeAt(index++) : null),
      print: (line) => {
        stdout += `${line}\n`;
      },
      printErr: (line) => {
        stderr += `${line}\n`;
      },
    });

    self.postMessage({
      type: 'compiled',
      ok: !stderr.trim(),
      stdout,
      stderr,
    });
  } catch (error) {
    const message = error?.message || String(error);
    self.postMessage({
      type: 'compiled',
      ok: false,
      stdout,
      stderr: `${stderr}${message}`,
    });
  }
};
