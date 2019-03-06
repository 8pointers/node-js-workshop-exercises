const { transport: walletTransport } = require('../../util/tinyrpc');
const transport = require('../../util/jsonRpcTransport');

const invokeWallet = walletTransport('http://localhost:3000');

describe('RGS', function() {
  let invoke;
  beforeEach(() => (invoke = transport('http://localhost:3001')));

  it('should work with functions with no params', async function() {
    const result = await invoke('testService/greet', 'World');
    expect(result).toBe('Hello World!');
  });
  it('should handle errors', async function() {
    await expect(invoke('missingMethod')).rejects.toEqual({ code: -32601, message: 'Method not found' });
  });
  it('should work', async function() {
    const unsettledTicket = await invoke('ticketService/getUnsettled', 1);
  });
  it('integration', async function() {
    const initialBalance = 1000;
    const ticketPrice = 1;
    const accountId = await invokeWallet('walletService', 'createAccount');
    await invokeWallet(
      'walletService',
      'postTransaction',
      accountId,
      'DEPOSIT',
      initialBalance,
      `${accountId}-DEPOSIT`
    );
    const unsettledTicket = await invoke('ticketService/getUnsettled', accountId);
    expect(unsettledTicket).toBe(null);
    const purchasedTicket = await invoke('ticketService/purchase', accountId, ticketPrice);
    const balanceAfterPurchase = await invokeWallet('walletService', 'getBalance', accountId);
    expect(balanceAfterPurchase).toBe(initialBalance - ticketPrice);
    await invoke('ticketService/settle', accountId, purchasedTicket.id);
    const balanceAfterSettle = await invokeWallet('walletService', 'getBalance', accountId);
    expect(balanceAfterSettle).toBe(initialBalance - ticketPrice + purchasedTicket.winAmount);
  });
});
