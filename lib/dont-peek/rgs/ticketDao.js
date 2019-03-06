const dbName = 'rgs';

class TicketDao {
  constructor(client) {
    this.db = client.connect().then(() => client.db(dbName).collection('tickets'));
    this.db.then(tickets => tickets.createIndex({ unique: 1 }, { unique: true }));
  }

  findUnsettled(accountId) {
    return this.db.then(tickets =>
      tickets.findOne({
        accountId,
        state: { $nin: ['settled', 'void'] }
      })
    );
  }

  create(accountId, price, winAmount, prizeLevel, scenario) {
    const id = Date.now();
    const ticket = { id, state: 'created', accountId, price, winAmount, prizeLevel, scenario };
    return this.db
      .then(tickets => tickets.insertOne({ _id: ticket.id, unique: accountId, ...ticket }))
      .then(() => ticket);
  }

  findById(id) {
    return this.db.then(tickets => tickets.findOne({ _id: id }));
  }

  update(ticket) {
    return this.db.then(tickets =>
      tickets.updateOne(
        { _id: ticket.id },
        {
          $set: {
            ...ticket,
            unique: ticket.state === 'settled' || ticket.state === 'void' ? ticket.id : ticket.accountId
          }
        }
      )
    );
  }
}

module.exports = TicketDao;
