# Exercise 1

Implement and expose ticketService and accountService through tinyrpc.

```javascript
accountService.getBalance(accountId);
ticketService.getUnsettled(accountId);
ticketService.purchase(accountId, price);
ticketService.settle(ticketId);
```

Ticket

```javascript
const ticket = {
  id: 12345,
  accountId: 234,
  state: 'purchased', // 'created'/'purchased'/'settled'/'void'
  ticketPrice: 1,
  winAmount: 10,
  prizeLevel: 3,
  scenario: 'a-prize-level-3-scenario'
};
```
