const haveSameContent = require('./haveSameContent');

describe('haveSameContent', function() {
  it('should return false if different', async function() {
    const result = await haveSameContent(`${__dirname}/parent.json`, `${__dirname}/child.json`);
    expect(result).toBe(false);
  });
  it('should return true if same', async function() {
    const result = await haveSameContent(`${__dirname}/child.json`, `${__dirname}/sameChild.json`);
    expect(result).toBe(true);
  });
  it('should return true if same', function() {
    return haveSameContent(`${__dirname}/child.json`, `${__dirname}/sameChild.json`).then(result =>
      expect(result).toBe(true)
    );
  });
});
