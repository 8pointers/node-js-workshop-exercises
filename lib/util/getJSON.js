const https = require('https');

const getJSON = (url, callback) =>
  https
    .get(url, res => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
      }
      if (error) {
        // consume response data to free up memory
        res.resume();
        callback(error);
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          callback(undefined, parsedData);
        } catch (e) {
          callback(e);
        }
      });
    })
    .on('error', callback);

module.exports = getJSON;
