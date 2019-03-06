const loadConfig = require('./loadConfig');

describe('loadConfig', function() {
  it('should load config', async function() {
    const message = await loadConfig('parent.json');
    expect(message).toBe('Hello World!');
  });
});
