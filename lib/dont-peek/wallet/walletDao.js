const { promisify } = require('util');

class WalletDao {
  constructor(sqliteDb) {
    this.sqliteGet = promisify(sqliteDb.get.bind(sqliteDb));
    this.sqliteAll = promisify(sqliteDb.all.bind(sqliteDb));
    this.sqliteRun = promisify(sqliteDb.run.bind(sqliteDb));
    this.sqliteReady = this.sqliteRun(
      `create table if not exists account(
        id integer primary key,
        current_balance decimal not null
      )`
    ).then(() =>
      this.sqliteRun(
        `create table if not exists account_transaction(
          id integer primary key,
          account_id integer references account(id),
          transaction_type varchar(255) not null,
          amount decimal not null,
          external_id varchar(255) not null unique
        )`
      )
    );
  }

  createAccount() {
    return this.sqliteReady
      .then(() => this.sqliteRun('insert into account(current_balance) values (0)'))
      .then(() => this.sqliteGet('select last_insert_rowid() id'))
      .then(({ id }) => id);
  }

  getBalance(accountId) {
    return this.sqliteReady
      .then(() => this.sqliteGet('select current_balance balance from account where id = ?', accountId))
      .then(row => (row === undefined ? Promise.reject('notFound') : row.balance));
  }

  postTransaction(accountId, transactionType, amount, externalId) {
    return this.sqliteReady
      .then(() => this.sqliteRun('begin transaction'))
      .then(() => this.sqliteGet('select current_balance balance from account where id = ?', accountId))
      .then(result => (result === undefined ? Promise.reject('accountNotFound') : result))
      .then(({ balance }) => balance + amount < 0 && Promise.reject('insufficientFunds'))
      .then(() =>
        this.sqliteRun(
          'insert or ignore into account_transaction  (account_id, transaction_type, amount, external_id) values (?, ?, ?, ?)',
          accountId,
          transactionType,
          amount,
          externalId
        )
      )
      .then(() => this.sqliteGet('select changes() changes'))
      .then(
        ({ changes: rows }) =>
          rows === 1 &&
          this.sqliteRun('update account set current_balance = current_balance + ? where id = ?', amount, accountId)
      )
      .then(() => this.sqliteRun('commit transaction'))
      .catch(reason => this.sqliteRun('rollback transaction') && Promise.reject(reason));
  }

  getAccounts() {}

  getTransactions() {}
}

module.exports = WalletDao;
