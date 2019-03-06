const sqlite3 = require('sqlite3').verbose();
const WalletDao = require('./walletDao');

describe('walletDao', function() {
  let walletDao;
  beforeEach(() => (walletDao = new WalletDao(new sqlite3.Database('test.db'))));
  it('should return numbers in [0, 1) interval', async function() {
    const accountId = await walletDao.createAccount();
    expect(typeof accountId).toBe('number');
  });
  it('should have balance 0 when a new account is created', async function() {
    const accountId = await walletDao.createAccount();
    const balance = await walletDao.getBalance(accountId);
    expect(balance).toBe(0);
  });
  it('should throw notFound', async function() {
    await expect(walletDao.getBalance(-1)).rejects.toBe('notFound');
  });
  it('should post', async function() {
    const accountId = await walletDao.createAccount();
    const externalId = `${accountId}-${Date.now()}`;
    await walletDao.postTransaction(accountId, 'CREDIT', 10, externalId);
    expect(await walletDao.getBalance(accountId)).toBe(10);
  });
  it('should post', async function() {
    const accountId = -1;
    const externalId = `${accountId}-${Date.now()}`;
    await expect(walletDao.postTransaction(accountId, 'CREDIT', 10, externalId)).rejects.toBe('accountNotFound');
  });
  it('should post', async function() {
    const accountId = await walletDao.createAccount();
    const externalId = `${accountId}-${Date.now()}`;
    await expect(walletDao.postTransaction(accountId, 'DEBIT', -10, externalId)).rejects.toBe('insufficientFunds');
  });
});
