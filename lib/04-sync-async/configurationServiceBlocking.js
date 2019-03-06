const fs = require('fs');

class ConfigurationServiceBlocking {
  constructor(configPath) {
    this.configPath = configPath;
  }

  getConfig() {
    const config = fs.readFileSync(this.configPath, { encoding: 'utf-8' });
    return JSON.parse(config);
  }
}

module.exports = ConfigurationServiceBlocking;
