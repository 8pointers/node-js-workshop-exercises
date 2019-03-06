# Exercise 1

Implement missing methods in swapi.js

# Exercise 2

Implement a RandomOrgRng class that fetches a (truly) random decimal number between [0, 1] using random.org json-rpc api.

You should use generateDecimalFractions method.

For more details, see here: [https://api.random.org/json-rpc/2/basic](https://api.random.org/json-rpc/2/basic).

```javascript
const endpointUrl = 'https://api.random.org/json-rpc/2/invoke';
const apiKey = '50f2a8fb-482d-43c2-94f9-836b5692b9a2';
const decimalPlaces = 2;
const rng = new RandomOrgRng(endpointUrl, apiKey, decimalPlaces);
rng.getNextNumber((err, number) => {
  //...
});
```
