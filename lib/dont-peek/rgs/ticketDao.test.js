const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const TicketDao = require('./ticketDao');

const accountId = 1;
describe('TicketDao', function() {
  let ticketDao;
  beforeEach(async () => {
    ticketDao = new TicketDao(client);
    const ticket = await ticketDao.findUnsettled(accountId);
    if (ticket) {
      ticket.state = 'void';
      await ticketDao.update(ticket);
    }
  });
  it('should work', async function() {
    const createdTicket = await ticketDao.create(1, 10, 0, 'scenario-0-0');
    createdTicket.state = 'purchased';
    await ticketDao.update(createdTicket);
    const sameTicket = await ticketDao.findUnsettled(accountId);
    const ticketById = await ticketDao.findById(sameTicket.id);
    expect(ticketById).toEqual(sameTicket);
    expect(sameTicket.unique).toBe(accountId);
    sameTicket.state = 'settled';
    await ticketDao.update(sameTicket);
    const unsettledTicket = await ticketDao.findUnsettled(accountId);
    expect(unsettledTicket).toBe(null);
  });
});
