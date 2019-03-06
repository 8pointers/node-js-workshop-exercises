# Exercise 1

If we have a hierarchy of config files, like so:

parent.json:

```json
{ "childConfig": "child1.json" }
```

child1.json:

```json
{ "message": "Message from first child" }
```

Implement a function loadConfig that (asynchrohously) loads the message from the child config:

```javascript
loadConfig('parent.json', function(err, message) {
  if (err) {
    console.error('An error occurred', err);
  } else {
    console.log(message);
  }
});
```

# Exercise 2

Implemet a function haveSameContent that compares the content of 2 files. This is how it should be used:

```javascript
haveSameContent(path1, path2, function(err, isSame) {
  if (err) {
    console.error('An error occurred', err);
  } else {
    console.log(isSame ? 'yes' : 'no');
  }
});
```

# Exercise 3

Create a Game class that, using a game config (example in config/testGame.json) provides a nextOutcome method that randomly (according to probabilities specified in the config file) returns prizeLevel, winAmount (ticketPrice \* multiplier) and scenario.

```javascript
const game = new Game('config/testGame.json');
const ticketPrice = 1;
game.nextOutcome(ticketPrice, function(err, { prizeLevel, winAmount, scenario }) {
  //...
});
```
