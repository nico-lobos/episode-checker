if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
if (typeof TransformStream === 'undefined') {
  global.TransformStream = require('web-streams-polyfill/dist/ponyfill.js').TransformStream;
}
if (typeof BroadcastChannel === 'undefined') {
  global.BroadcastChannel = class {
    constructor() {}
    postMessage() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
    onmessage = null;
  };
} 