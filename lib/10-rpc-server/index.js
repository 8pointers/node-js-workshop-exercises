const { rpc } = require('../util/tinyrpc');

const testService = {
  sayHello: (firstName, lastName) => Promise.resolve(`Hello ${firstName} ${lastName}!`)
};

rpc(3000, { testService });
