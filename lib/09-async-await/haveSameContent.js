const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const haveSameContent = async function(...paths) {
  const [content1, content2] = await Promise.all(paths.map(path => readFile(path, { encoding: 'utf-8' })));
  return content1 === content2;
};

module.exports = haveSameContent;
