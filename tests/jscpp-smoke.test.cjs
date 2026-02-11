const test = require('node:test');
const assert = require('node:assert/strict');
const JSCPP = require('JSCPP');

test('runs a basic C++ program and captures stdout', () => {
  const code = `
#include <iostream>
using namespace std;
int main() {
  cout << "OK" << endl;
  return 0;
}
`;

  let output = '';
  const exitCode = JSCPP.run(code, '', {
    stdio: {
      write: (chunk) => {
        output += String(chunk ?? '');
      },
    },
  });

  assert.equal(exitCode, 0);
  assert.match(output, /OK/);
});

test('reads stdin via cin', () => {
  const code = `
#include <iostream>
using namespace std;
int main() {
  int value;
  cin >> value;
  cout << value * 3 << endl;
  return 0;
}
`;

  let output = '';
  const exitCode = JSCPP.run(code, '7', {
    stdio: {
      write: (chunk) => {
        output += String(chunk ?? '');
      },
    },
  });

  assert.equal(exitCode, 0);
  assert.match(output, /21/);
});

test('throws on invalid C++ source', () => {
  const badCode = `
int main( {
  return 0;
}
`;

  assert.throws(() => {
    JSCPP.run(badCode, '', {
      stdio: {
        write: () => {},
      },
    });
  });
});
