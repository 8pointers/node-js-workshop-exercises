const Koa = require('koa');
const MongoClient = require('mongodb').MongoClient;
// const koaJsonRpc = require('koa-jsonrpc');
const koaJsonRpc = require('../../util/koaJsonRpc');
const { transport } = require('../../util/tinyrpc');
const randomOrgRng = require('./randomOrgRng');
const Game = require('./game');
const TicketDao = require('./ticketDao');
const TicketService = require('./ticketService');

const testService = { greet: name => Promise.resolve(`Hello ${name}!`) };

const rng = randomOrgRng('https://api.random.org/json-rpc/1/invoke', '50f2a8fb-482d-43c2-94f9-836b5692b9a2', 1);
const game = new Game('config/testGame.json', rng);
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const ticketDao = new TicketDao(client);
const walletTransport = transport('http://localhost:3000');
const ticketService = new TicketService(game, ticketDao, walletTransport);

const app = new Koa();
const jrpc2 = koaJsonRpc({});
Object.entries({ testService, ticketService })
  .map(([serviceName, service]) => Object.keys(service).map(methodName => [serviceName, service, methodName]))
  .reduce((acc, x) => [...acc, ...x], [])
  .forEach(([serviceName, service, methodName]) =>
    jrpc2.use(`${serviceName}/${methodName}`, async (...args) => await service[methodName](...args))
  );
app.use(jrpc2.app());
app.listen(3001);
