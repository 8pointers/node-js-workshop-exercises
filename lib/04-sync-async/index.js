const ConfigurationServiceBlocking = require('./configurationServiceBlocking');
const ConfigurationServiceNonBlocking = require('./configurationServiceNonBlocking');

const configPath = `${__dirname}/config.json`;
// const configPath = `${__dirname}/badConfig.json`;
// const configPath = `${__dirname}/missingConfig.json`;

// console.log('before');

const configService1 = new ConfigurationServiceBlocking(configPath);
try {
  const config = configService1.getConfig();
  console.log('1', 'port', config.port);
} catch (e) {
  console.error('1', e);
}

// console.log('during');

const configService2 = new ConfigurationServiceNonBlocking(configPath);
configService2.getConfig((err, config) => {
  if (err) {
    console.error('2', err);
  } else {
    console.log('2', 'port', config.port);
  }
});

// console.log('after');
