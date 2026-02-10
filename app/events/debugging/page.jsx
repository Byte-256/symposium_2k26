'use client';

import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import * as JSCPP from 'JSCPP';

// --- Timer Component ---
const CountdownTimer = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-2xl font-bold text-red-500">
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};


// --- Round 1 Component ---
const Round1 = ({ onComplete }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Round 1: The Quiz</h2>
        <p className="mb-4">Please complete the quiz below. You need to score enough points to qualify for the next round.</p>
        <p className="mb-4 text-sm text-gray-400">
            NOTE: Replace the URL below with your actual Google Form embed URL.
        </p>
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSf-XbRMbgPNCD5S9sMuRwwqa_5al_irFdnWqztvGSoOHg-Ibg/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
        >
            Loading…
        </iframe>
        <button
            onClick={onComplete}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            I have completed the quiz
        </button>
    </div>
);

// --- Round 2 Component ---
const buggyPythonCode = `
import sys

# This function is supposed to concatenate two strings
# but it has a bug. Find it and fix it.
def concatenate_strings(a, b):
  return a + b

def main():
  # The password is "SuperSecretPassword123"
  # Don't just print the password, fix the code to reveal it.
  part1 = "SuperSecret"
  part2 = "Password123"
  
  # There's a logical error in how the parts are combined.
  result = concatenate_strings(part2, part1) # Oh, this looks wrong
  
  # And another small issue here...
  prnt("The password is:", result)

if __name__ == "__main__":
  main()
`;

const Round2 = ({ onComplete }) => {
    const [code, setCode] = useState(buggyPythonCode);
    const [output, setOutput] = useState("");
    const [pyodide, setPyodide] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.pyodide) {
                setPyodide(window.pyodide);
                setIsLoading(false);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
            document.body.appendChild(script);
            script.onload = async () => {
                const pyodideInstance = await window.loadPyodide();
                window.pyodide = pyodideInstance;
                setPyodide(pyodideInstance);
                setIsLoading(false);
            };
        };
        loadPyodide();
    }, []);

    const runCode = async () => {
        if (!pyodide) {
            setOutput("Pyodide is not loaded yet.");
            return;
        }
        setOutput("Running code...");
        try {
            let capturedOutput = "";
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                capturedOutput += args.join(' ') + '\\n';
            };

            pyodide.globals.set('print', (s) => {
                capturedOutput += s + '\\n';
            });

            await pyodide.runPythonAsync(code);
            console.log = originalConsoleLog;
            setOutput(capturedOutput);

            if (capturedOutput.includes("SuperSecretPassword123")) {
                onComplete("SuperSecretPassword123");
            }
        } catch (err) {
            setOutput(err.toString());
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Round 2: Python Debugging</h2>
            <p className="mb-4">Debug the Python code below. When it runs successfully, it will print a password to unlock the final round.</p>

            <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.python)}
                    padding={10}
                    className="bg-gray-700 rounded-md"
                />
            </div>

            <button
                onClick={runCode}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={isLoading}
            >
                {isLoading ? "Loading Pyodide..." : "Run Code"}
            </button>

            <h3 className="text-xl font-bold mt-4">Output:</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white whitespace-pre-wrap">{output}</pre>
        </div>
    );
};


// --- Round 3 Component ---
const buggyCppCode = `
#include <iostream>
#include <string>
#include <vector>

// The flag is hidden, you need to fix the logic to print it.
// The correct flag is "FLAG{DeBuGgInG_Is_FuN}"
void print_flag() {
    std::string part1 = "FLAG{";
    std::string part2 = "DeBuGgInG";
    std::string part3 = "_Is_";
    std::string part4 = "FuN";
    std::string part5 = "}";

    // There is a bug in the following line.
    std::cout << part1 << part2 << part4 << part3 << part5 << std::endl;
}

int main() {
    print_flag();
    return 0;
}
`;

const Round3 = ({ onComplete }) => {
    const [code, setCode] = useState(buggyCppCode);
    const [output, setOutput] = useState("");
    const [flag, setFlag] = useState("");

    // Use JSCPP AsyncWebWorkerHelper to run in a WebWorker (client-only, non-blocking).
    const helperRef = useRef(null);
    // Use a same-origin worker bootstrap that imports the actual JSCPP script.
    const helperScriptUrl = '/JSCPP.worker.js';

    const runCode = async () => {
        setOutput('Starting worker and running...');
        try {
            const safeCode = String(code || '');
            let capturedOutput = '';
            const config = {
                stdio: {
                    write: (s) => {
                        try { capturedOutput += String(s || ''); } catch (e) { /* ignore */ }
                    }
                }
            };

            if (!helperRef.current) {
                if (!JSCPP || !JSCPP.AsyncWebWorkerHelper) {
                    setOutput('JSCPP AsyncWebWorkerHelper is not available. Make sure the JSCPP package is installed.');
                    return;
                }
                // Create helper pointing to the worker script URL (fetched by the helper)
                helperRef.current = new JSCPP.AsyncWebWorkerHelper(helperScriptUrl);
            }

            const helper = helperRef.current;
            // helper.run returns a Promise resolving to the exit code
            const returnCode = await helper.run(safeCode, '', config);
            setOutput(capturedOutput + '\nprogram exited with code ' + returnCode);
        } catch (err) {
            console.error('Error running code in worker:', err);
            setOutput(String(err && err.stack ? err.stack : err));
        }
    };

    const submitFlag = () => {
        if (flag === "FLAG{DeBuGgInG_Is_FuN}") {
            onComplete(flag);
        } else {
            alert("Incorrect Flag!");
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Round 3: C++ CTF</h2>
            <p className="mb-4">Debug the C++ code to find the hidden flag. Submit the flag to win!</p>

            <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.cpp)}
                    padding={10}
                    className="bg-gray-700 rounded-md"
                />
            </div>

            <button
                onClick={runCode}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Run Code
            </button>

            <h3 className="text-xl font-bold mt-4">Output:</h3>
            <pre className="bg-gray-900 p-4 rounded-md text-white whitespace-pre-wrap">{output}</pre>

            <h3 className="text-xl font-bold mt-4">Submit Flag:</h3>
            <input
                type="text"
                placeholder="Enter flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="mt-4 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <button
                onClick={submitFlag}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit Flag
            </button>
        </div>
    );
};

// --- Other Components ---
const Congratulations = () => (
    <div className="text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations!</h2>
        <p className="text-xl">You have successfully completed all rounds of the debugging contest.</p>
        <p>Please wait for the final results.</p>
    </div>
);

const TimesUp = () => (
    <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Time's Up!</h2>
        <p className="text-xl">You have run out of time.</p>
        <p>Better luck next time!</p>
    </div>
);


// --- Main Page Component ---
export default function DebuggingContestPage() {
    const [currentRound, setCurrentRound] = useState(1);
    const roundDurations = {
        1: 60 * 10, // 10 minutes
        2: 60 * 15, // 15 minutes
        3: 60 * 20, // 20 minutes
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleTimeUp = () => {
        setCurrentRound('times_up');
    }

    const handleRound1Complete = () => {
        setCurrentRound(2);
    };

    const handleRound2Complete = (password) => {
        if (password === "SuperSecretPassword123") {
            setCurrentRound(3);
        }
    };

    const handleRound3Complete = (flag) => {
        if (flag === "FLAG{DeBuGgInG_Is_FuN}") {
            setCurrentRound(4); // Move to a "completed" state
        }
    }

    const renderCurrentRound = () => {
        switch (currentRound) {
            case 1:
                return <Round1 onComplete={handleRound1Complete} />;
            case 2:
                return <Round2 onComplete={handleRound2Complete} />;
            case 3:
                return <Round3 onComplete={handleRound3Complete} />;
            case 4:
                return <Congratulations />;
            case 'times_up':
                return <TimesUp />;
            default:
                return <Round1 onComplete={handleRound1Complete} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-center">Debugging Contest</h1>
                {currentRound !== 4 && currentRound !== 'times_up' && (
                    <CountdownTimer duration={roundDurations[currentRound]} onTimeUp={handleTimeUp} />
                )}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {renderCurrentRound()}
            </div>
        </div>
    );
}
