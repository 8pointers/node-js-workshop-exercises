const fs = require('fs');
const { promisify } = require('util');

class Game {
  constructor(gameConfigPath, rng) {
    const readFile = promisify(fs.readFile.bind(fs));
    this.config = readFile(gameConfigPath, { encoding: 'utf-8' }).then(content => JSON.parse(content));
    this.rng = rng;
  }

  async nextOutcome(ticketPrice) {
    const [rngLevel, rngScenario] = await Promise.all([this.rng(1), this.rng(1)]);
    const { prices, prizeLevels } = await this.config;
    if (prices.indexOf(ticketPrice) === -1) {
      throw 'invalidTicketPrice';
    }
    let prizeLevel = prizeLevels.length - 1;
    for (let sum = 0; prizeLevel > 0; prizeLevel--) {
      sum += prizeLevels[prizeLevel].probabilityUp / prizeLevels[prizeLevel].probabilityDown;
      if (sum > rngLevel) {
        break;
      }
    }
    const { scenarios, multiplier } = prizeLevels[prizeLevel];
    const winAmount = ticketPrice * multiplier;
    const scenario = scenarios[Math.floor(rngScenario * scenarios.length)];
    return { prizeLevel, winAmount, scenario };
  }
}

module.exports = Game;
