const ConfigurationServiceBlocking = require('./configurationServiceBlocking');
const ConfigurationServiceNonBlocking = require('./configurationServiceNonBlocking');

const configPath = `${__dirname}/config.json`;
const missingConfigPath = `${__dirname}/missingConfig.json`;
const badConfigPath = `${__dirname}/badConfig.json`;

describe('configurationServiceBlocking', function() {
  it('should parse config file (blocking)', function() {
    const configService = new ConfigurationServiceBlocking(configPath);
    const config = configService.getConfig();
    expect(config).toEqual({ port: 3000 });
  });
  it('should throw an exception when config file is missing (blocking)', function() {
    const configService = new ConfigurationServiceBlocking(missingConfigPath);
    expect(() => configService.getConfig()).toThrowErrorMatchingInlineSnapshot(
      `"ENOENT: no such file or directory, open '/Users/damjan/projects/8pointers/node-js-workshop-exercises/lib/04-sync-async/missingConfig.json'"`
    );
  });
  it('should throw an exception when config file cannot be parsed (blocking)', function() {
    const configService = new ConfigurationServiceBlocking(badConfigPath);
    expect(() => configService.getConfig()).toThrow(new SyntaxError('Unexpected end of JSON input'));
  });
});

describe('async tests', function() {
  it('should fail???', function() {
    setTimeout(() => expect(1).toBe(2), 0);
  });
  it('is interesting', function(done) {
    setTimeout(done, 10);
  });
});

describe('configurationServiceNonBlocking', function() {
  it('should parse config file (non-blocking)', function(done) {
    const configService = new ConfigurationServiceNonBlocking(configPath);
    configService.getConfig((err, config) => {
      expect(err).toBe(undefined);
      expect(config).toEqual({ port: 3000 });
      done();
    });
  });
  it('should an error to a callback when config file is missing (non-blocking)', function(done) {
    const configService = new ConfigurationServiceNonBlocking(missingConfigPath);
    configService.getConfig((err, config) => {
      expect(err).toMatchInlineSnapshot(
        `[Error: ENOENT: no such file or directory, open '/Users/damjan/projects/8pointers/node-js-workshop-exercises/lib/04-sync-async/missingConfig.json']`
      );
      expect(config).toBe(undefined);
      done();
    });
  });
  it('should throw an exception when config file cannot be parsed (blocking)', function(done) {
    const configService = new ConfigurationServiceNonBlocking(badConfigPath);
    configService.getConfig((err, config) => {
      expect(err).toEqual(new SyntaxError('Unexpected end of JSON input'));
      expect(config).toBe(undefined);
      done();
    });
  });
});
