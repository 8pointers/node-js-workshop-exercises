const { transport } = require('../util/tinyrpc');

const invoke = transport('http://localhost:3000');

describe('rpc server', function() {
  it('should have testService', async function() {
    const greeting = await invoke('testService', 'sayHello', 'Myamoto', 'Musashi');
    expect(greeting).toBe('Hello Myamoto Musashi!');
  });
});
