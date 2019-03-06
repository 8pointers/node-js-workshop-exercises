const SWApi = require('./swapi');

xdescribe('swapi', function() {
  let swApi;
  beforeEach(() => (swApi = new SWApi('https://swapi.co/api')));
  it('should be able to get films', function(done) {
    swApi.getFilms().then(films => {
      expect(films.results.length).toBe(7);
      done();
    });
  });
  it('should be able to get film names', function(done) {
    swApi.getFilmNames().then(names => {
      expect(names).toEqual([
        'A New Hope',
        'Attack of the Clones',
        'The Phantom Menace',
        'Revenge of the Sith',
        'Return of the Jedi',
        'The Empire Strikes Back',
        'The Force Awakens'
      ]);
      done();
    });
  });
});
