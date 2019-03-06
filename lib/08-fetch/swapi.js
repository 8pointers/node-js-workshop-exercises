const fetch = require('node-fetch');

const getJSON = url => fetch(url).then(response => response.json());

class SWApi {
  constructor(baseUrl) {
    this.this.getJSON = getJSON(baseUrl);
  }

  getFilms() {
    return this.getJSON('/films/');
  }

  getFilmNames() {
    return this.getFilms().then(({ results }) =>
      results.map(({ title }) => title)
    );
  }

  // see https://swapi.co/documentation#people
  getPerson(id) {
    return this.getJSON(`/people/${id}`);
  }

  // see https://swapi.co/documentation#films
  getFilm(id) {
    return this.getJSON(`/films/${id}`);
  }

  // implement this by combining getPerson and getFilm
  getMainProtagonistName(filmId) {
    return this.getFilm(filmId).then(({ characters: [main] }) =>
      this.getJSON(main)
    );
  }
}

module.exports = SWApi;
