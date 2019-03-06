const request = require('request');

let id = 0;

class RandomOrgRng {
  constructor(endpointUrl, apiKey, decimalPlaces) {
    this.endpointUrl = endpointUrl;
    this.apiKey = apiKey;
    this.decimalPlaces = decimalPlaces;
  }

  getNextNumber(n, callback) {
    request.post(
      {
        url: this.endpointUrl,
        json: true,
        body: {
          jsonrpc: '2.0',
          method: 'generateDecimalFractions',
          params: { apiKey: this.apiKey, n, decimalPlaces: this.decimalPlaces },
          id: id++
        }
      },
      function(error, response, body) {
        if (error) {
          callback(error);
        } else {
          if (body.error) {
            callback(body.error);
          } else {
            callback(undefined, body.result.random.data[0]);
          }
        }
      }
    );
  }
}

module.exports = RandomOrgRng;
