function TicketService(game, ticketDao, walletTransport) {
  this.getUnsettled = function(accountId) {
    return ticketDao.findUnsettled(accountId);
  };

  this.purchase = async function(accountId, ticketPrice) {
    const { prizeLevel, winAmount, scenario } = await game.nextOutcome(ticketPrice);
    const ticket = await ticketDao.create(accountId, ticketPrice, winAmount, prizeLevel, scenario);
    await walletTransport('walletService', 'postTransaction', accountId, 'DEBIT', -ticketPrice, `${ticket.id}-DEBIT`);
    ticket.state = 'purchased';
    await ticketDao.update(ticket);
    return ticket;
  };

  this.settle = async function(accountId, ticketId) {
    const ticket = await ticketDao.findById(ticketId);
    if (ticket.state !== 'purchased') {
      throw 'invalidOperation';
    }
    const result = await walletTransport(
      'walletService',
      'postTransaction',
      accountId,
      'CREDIT',
      ticket.winAmount,
      `${ticket.id}-CREDIT`
    );
    ticket.state = 'created';
    await ticketDao.update(ticket);
    return null;
  };
}

module.exports = TicketService;
