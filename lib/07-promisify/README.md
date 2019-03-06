# Exercise 1

Refactor RandomOrgRng so that is using promisify.

# Exercise 2

Promisify fs.readFile and then implement loadConfig function (from 04-sync-async).

```javascript
loadConfig('parent.json').then(message => console.log(message), reason => console.log(reason));
```

# Exercise 3

Promisify fs.readFile and then implement promise-based haveSameContent function.

```javascript
haveSameContent(path1, path2).then(isSame => console.log(isSame ? 'yes' : 'no'), reason => console.log(reason));
```
