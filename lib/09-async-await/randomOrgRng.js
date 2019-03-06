const fetch = require('node-fetch');

let id = 0;

const randomOrgRng = (endpointUrl, apiKey, decimalPlaces) => n =>
  fetch(endpointUrl, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'generateDecimalFractions',
      params: { apiKey, n, decimalPlaces },
      id: id++
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(result =>
      result.error ? Promise.reject(result.error) : result.result.random.data
    );

module.exports = randomOrgRng;
