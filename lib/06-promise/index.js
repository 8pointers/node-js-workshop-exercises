const SWApi = require('./swapi');

const swApi = new SWApi('https://swapi.co/api');

swApi.getFilmNames().then(filmNames => console.log('filmNames', filmNames), reason => console.error('filmNames', reason));
