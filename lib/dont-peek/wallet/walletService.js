class WalletService {
  constructor(walletDao) {
    this.walletDao = walletDao;
  }

  createAccount() {
    return this.walletDao.createAccount();
  }

  getBalance(accountId) {
    return this.walletDao.getBalance(accountId);
  }

  postTransaction(accountId, transactionType, amount, externalId) {
    return this.walletDao.postTransaction(accountId, transactionType, amount, externalId);
  }
}

module.exports = WalletService;
