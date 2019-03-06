const fetch = require('node-fetch');

let id = 0;
const transport = baseUrl => (method, ...args) =>
  fetch(`${baseUrl}`, {
    method: 'POST',
    body: JSON.stringify({ jsonrpc: '2.0', method, params: args, id: ++id }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(({ result, error }) => (error ? Promise.reject(error) : result));

module.exports = transport;
