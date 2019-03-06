const parse = require('co-body');

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

class JsonRpcError extends Error {
  constructor(message, code, data) {
    super();
    this.message = message;
    this.code = code;
    if (typeof data !== 'undefined') {
      this.data = data;
    }
  }
}

const jsonResp = (id, error, result) => {
  const o = {};
  if (error && result) {
    throw new Error('Mutually exclusive error and result exist');
  }
  if (id !== null && typeof id !== 'string' && typeof id !== 'number') {
    throw new TypeError(`Invalid id type ${typeof id}`);
  }
  if (typeof result !== 'undefined') {
    o.result = result;
  } else if (error) {
    if (typeof error.code !== 'number') {
      throw new TypeError(`Invalid error code type ${typeof error.code}`);
    }
    if (typeof error.message !== 'string') {
      throw new TypeError(`Invalid error message type ${typeof error.message}`);
    }
    o.error = error;
  } else {
    throw new Error('Missing result or error');
  }
  o.jsonrpc = '2.0';
  o.id = id;
  return o;
};

class koaJsonRpc {
  constructor(opts) {
    this.registry = Object.create(null);
  }
  use(name, func) {
    this.registry[name] = func;
  }
  app() {
    return async (ctx, next) => {
      let body, result;
      try {
        body = await parse.json(ctx);
      } catch (err) {
        ctx.body = jsonResp(null, new JsonRpcError('Parse error', -32700));
        return;
      }
      if (
        body.jsonrpc !== '2.0' ||
        !hasOwnProperty(body, 'method') ||
        !hasOwnProperty(body, 'id') ||
        ctx.request.method !== 'POST'
      ) {
        ctx.body = jsonResp(body.id || null, new JsonRpcError('Invalid Request', -32600));
        return;
      }
      if (!this.registry[body.method]) {
        ctx.body = jsonResp(body.id, new JsonRpcError('Method not found', -32601));
        return;
      }
      try {
        result = await this.registry[body.method](...body.params);
      } catch (e) {
        console.log(e);
        // if (e instanceof InvalidParamsError) {
        //   ctx.body = jsonResp(body.id, jsonError.InvalidParams(e.message));
        //   return;
        // }
        ctx.body = jsonResp(body.id, new JsonRpcError(e.message || 'Internal Error', -32603));
        return;
      }
      ctx.body = jsonResp(body.id, null, result);
    };
  }
}
module.exports = (...args) => new koaJsonRpc(...args);
