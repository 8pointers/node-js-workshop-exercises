const getJSON = require('../util/getJSON');
const { promisify } = require('util');

const getJSONAsPromise = promisify(getJSON);

class SWApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getFilms(callback) {
    return getJSONAsPromise(`${this.baseUrl}/films/`);
  }

  getFilmNames() {
    return this.getFilms().then(({ results }) => results.map(({ title }) => title));
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
