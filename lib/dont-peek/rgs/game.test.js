const Game = require('./game');
const configPath = `${__dirname}/testGame.json`;

describe('Game', function() {
  let game;
  let rngStub;
  beforeEach(() => (game = new Game(configPath, (rngStub = jest.fn()))));
  it('should', async function() {
    rngStub.mockReturnValue(Promise.resolve(0.009));
    const outcome = await game.nextOutcome(1);
    expect(outcome).toEqual({ prizeLevel: 2, winAmount: 100, scenario: 'scenario-2-0' });
  });
  it('should', async function() {
    rngStub.mockReturnValue(0.09);
    const outcome = await game.nextOutcome(2);
    expect(outcome).toEqual({ prizeLevel: 1, winAmount: 22, scenario: 'scenario-1-0' });
  });
  it('should', async function() {
    rngStub.mockReturnValue(0.2);
    const outcome = await game.nextOutcome(1);
    expect(outcome).toEqual({ prizeLevel: 0, winAmount: 0, scenario: 'scenario-0-0' });
  });
});
