const getJSON = require('../util/getJSON');

const getJSONAsPromise = url =>
  new Promise((resolve, reject) =>
    getJSON(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );

class SWApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getFilms() {
    return getJSONAsPromise(`${this.baseUrl}/films/`);
  }

  getFilmNames() {
    return this.getFilms().then(({ results }) => results.map(({ title }) => title));
  }

  // see https://swapi.co/documentation#people
  getPerson(id) {
    //TODO
  }

  // see https://swapi.co/documentation#films
  getFilm(id) {
    //TODO
  }

  // implement this by combining getPerson and getFilm
  getMainProtagonistName(filmId) {
    //TODO
  }
}

module.exports = SWApi;
