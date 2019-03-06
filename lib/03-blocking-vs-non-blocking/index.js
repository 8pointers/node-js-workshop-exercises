const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const slowResponseDuration = 5000;
let counter = 0;

const server = http.createServer(({ url }, res) => {
  const respond = () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Request number ${counter++}.\n`);
  };
  if (url.match('slow-blocking')) {
    const blockUntil = Date.now() + slowResponseDuration;
    while (Date.now() <= blockUntil);
    respond();
    return;
  }
  if (url.match('slow-non-blocking')) {
    setTimeout(respond, slowResponseDuration);
    return;
  }
  respond();
});
server.listen(port, hostname, () => console.log('Listening...'));
