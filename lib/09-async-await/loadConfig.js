const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const loadConfig = async function(path) {
  const parentStr = await readFile(`${__dirname}/${path}`, { encoding: 'utf-8' });
  const parentConfig = JSON.parse(parentStr);
  const childStr = await readFile(`${__dirname}/${parentConfig.childConfig}`, { encoding: 'utf-8' });
  const childConfig = JSON.parse(childStr);
  return childConfig.message;
};

module.exports = loadConfig;
