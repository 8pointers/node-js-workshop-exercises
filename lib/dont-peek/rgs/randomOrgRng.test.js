const randomOrgRng = require('./randomOrgRng.js');

describe('random.org rng transport', function() {
  let rng;
  beforeEach(
    () => (rng = randomOrgRng('https://api.random.org/json-rpc/2/invoke', '50f2a8fb-482d-43c2-94f9-836b5692b9a2', 1))
  );
  it('should return numbers in [0, 1) interval', async function() {
    const [number] = await rng(1);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThan(1);
  });
  it('should be able to return multiple numbers', async function() {
    const numbers = await rng(10);
    expect(numbers.length).toBe(10);
  });
  it('should correctly report failures', async function() {
    expect.assertions(1);
    try {
      await rng(1e6);
    } catch (e) {
      expect(e).toEqual({
        code: 202,
        data: ['n', 1, 10000],
        message: "Parameter 'n' is out of range; allowable values are [1,10000]"
      });
    }
  });
});
