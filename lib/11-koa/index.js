const Koa = require('koa');
const koaJsonRpc = require('../util/koaJsonRpc');
const delay = timeInMillis => new Promise(resolve => setTimeout(resolve, timeInMillis));

const testService = {
  sayHello: (firstName, lastName) => Promise.resolve(`Hello ${firstName} ${lastName}!`)
};
class AnotherService {
  async slowHello(name) {
    await delay(1000);
    return `Hello ${name}!`;
  }
}
const anotherService = new AnotherService();

const app = new Koa();
const jrpc2 = koaJsonRpc({});
[['testService', testService, 'sayHello'], ['anotherService', anotherService, 'slowHello']].forEach(
  ([serviceName, service, methodName]) =>
    jrpc2.use(`${serviceName}/${methodName}`, async (...args) => await service[methodName](...args))
);
app.use(jrpc2.app());
app.listen(3000);
