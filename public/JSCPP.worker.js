// Worker bootstrap for JSCPP.
// This file is served from our origin so AsyncWebWorkerHelper can load it
// via a same-origin URL. It then imports the real JSCPP script from the CDN
// inside the worker using importScripts.

// Load JSCPP (ES5 build) inside the worker scope.
importScripts('https://cdn.jsdelivr.net/npm/JSCPP@2.0.9/dist/JSCPP.es5.min.js');

// No further bootstrapping needed: JSCPP exposes global `JSCPP` which the
// helper expects to find inside the worker when it executes code.

// Optionally we could add extra worker-side helpers here, but the library's
// AsyncWebWorkerHelper will communicate with this worker and use the global.
