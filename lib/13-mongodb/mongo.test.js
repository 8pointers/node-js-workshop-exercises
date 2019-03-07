const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

describe('mongodb', function() {
  it('should be able to use mongodb', async function() {
    await client.connect();
    const tickets = client.db('testDb').collection('tickets');

    const ticket = {
      state: 'created',
      accountId: 123,
      ticketPrice: 10,
      winAmount: 20,
      prizeLevel: 1
    };
    const { result } = await tickets.insertOne(ticket);
    expect(result).toEqual({ n: 1, ok: 1 });
    expect(ticket._id).toBeDefined();

    const sameTicket = await tickets.findOne({ _id: ticket._id });
    expect(sameTicket).toEqual(ticket);
  });
});
