const sqlite3 = require('sqlite3').verbose();
const { rpc } = require('../../util/tinyrpc');

const WalletDao = require('./walletDao');
const WalletService = require('./walletService');

const db = new sqlite3.Database('wallet.db');
const walletDao = new WalletDao(db);
const walletService = new WalletService(walletDao);

rpc(3000, { walletService });
