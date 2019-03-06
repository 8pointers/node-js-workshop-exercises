const SWApi = require('./swapi');

const swApi = new SWApi('https://swapi.co/api');

const callback = name => (err, result) => {
  if (err) {
    console.error(name, err);
  } else {
    console.log(name, result);
  }
};

swApi.getFilmNames(callback('filmNames'));

swApi.getPerson(1, callback('person'));
swApi.getFilm(1, callback('film'));
swApi.getMainProtagonistName(1, callback('mainProtagonistName'));
