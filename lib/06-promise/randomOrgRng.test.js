const RandomOrgRng = require('./randomOrgRng');

const endpointUrl = 'https://api.random.org/json-rpc/2/invoke';
const apiKey = '50f2a8fb-482d-43c2-94f9-836b5692b9a2';
const decimalPlaces = 2;

describe('RandomOrgRng', function() {
  let rng;
  beforeEach(() => (rng = new RandomOrgRng(endpointUrl, apiKey, decimalPlaces)));
  it('should be able to get a number', function(done) {
    rng.getNextNumber(1, (err, number) => {
      expect(typeof number).toBe('number');
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThan(1);
      done();
    });
  });
  it('should handle errors', function(done) {
    rng.getNextNumber(10001, err => {
      expect(err.message).toEqual("Parameter 'n' is out of range; allowable values are [1,10000]");
      done();
    });
  });
});
