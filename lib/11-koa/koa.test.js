const transport = require('../util/jsonRpcTransport');

const invoke = transport('http://localhost:3000');

describe('koa server', function() {
  it('should be able to invoke testService/sayHello', async function() {
    const greeting = await invoke('testService/sayHello', 'Myamoto', 'Musashi');

    expect(greeting).toBe('Hello Myamoto Musashi!');
  });

  it('should be able to invoke anotherService/slowHello', async function() {
    const greeting = await invoke('anotherService/slowHello', 'World');

    expect(greeting).toBe('Hello World!');
  });
});
