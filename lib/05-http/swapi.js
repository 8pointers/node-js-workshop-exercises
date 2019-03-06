const getJSON = require('../util/getJSON');

class SWApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getFilms(callback) {
    getJSON(`${this.baseUrl}/films/`, callback);
  }

  getFilmNames(callback) {
    this.getFilms((err, films) => {
      if (err) {
        callback(err);
      } else {
        callback(undefined, films.results.map(({ title }) => title));
      }
    });
  }

  // see https://swapi.co/documentation#people
  getPerson(id, callback) {
    //TODO
  }

  // see https://swapi.co/documentation#films
  getFilm(id, callback) {
    //TODO
  }

  // implement this by combining getPerson and getFilm
  getMainProtagonistName(filmId, callback) {
    //TODO
  }
}

module.exports = SWApi;
