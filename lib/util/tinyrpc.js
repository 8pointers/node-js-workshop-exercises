const fetch = require('node-fetch');

const rpc = (port, serviceRegistry) => {
  const server = require('http').createServer((req, res) => {
    const [, serviceName, methodName] = req.url.split('/');
    const payload = [];
    req.on('data', chunk => payload.push(chunk));
    req.on('end', () => {
      try {
        const args = JSON.parse(payload.length === 1 ? payload[0] : Buffer.concat(payload));
        const service = serviceRegistry[serviceName];
        console.log('rpc', serviceName, methodName, ...args);
        service[methodName]
          .apply(service, args)
          .then(result => ({ result }), error => ({ error }))
          .then(response => res.end(JSON.stringify(response)));
      } catch (e) {
        console.log(e);
        res.end(JSON.stringify({ error: e.message }));
      } finally {
        res.statusCode = 200;
      }
    });
  });
  server.listen(port);
};

const transport = baseUrl => (serviceName, methodName, ...args) =>
  fetch(`${baseUrl}/${serviceName}/${methodName}`, {
    method: 'POST',
    body: JSON.stringify(args),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(({ result, error }) => (error ? Promise.reject(new Error(error)) : result));

module.exports = { rpc, transport };
