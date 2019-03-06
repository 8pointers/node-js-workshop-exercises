const fs = require('fs');

class ConfigurationServiceNonBlocking {
  constructor(configPath) {
    this.configPath = configPath;
  }

  getConfig(callback) {
    fs.readFile(this.configPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        callback(err);
      } else {
        try {
          const config = JSON.parse(data);
          callback(undefined, config);
        } catch (e) {
          callback(e);
        }
      }
    });
  }
}

module.exports = ConfigurationServiceNonBlocking;
