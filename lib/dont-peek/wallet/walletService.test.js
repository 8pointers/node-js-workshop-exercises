const { transport } = require('../../util/tinyrpc');

const invoke = transport('http://localhost:3000');

describe('Wallet', function() {
  it('', async function() {
    const accountId = await invoke('walletService', 'createAccount');
    expect(typeof accountId).toBe('number');
  });
  it('', async function() {
    const accountId = await invoke('walletService', 'createAccount');
    const externalId = `${accountId}-${Date.now()}`;
    await invoke('walletService', 'postTransaction', accountId, 'CREDIT', 123, externalId);
    const balance = await invoke('walletService', 'getBalance', accountId);
    expect(balance).toBe(123);
  });
});
