### BoomerangCache.set

> Set a key to a particular value or a hash object (Object or Array) under a hash key.

#### Arguments

1. `key` (**String**)
2. `value` (**String**, **Number**, **Object**, **Array**)
3. `seconds` (**Number**) - optional


> These values will never expire and will only be removed when you (or the browser) removes them.

```js
boomerang.set('stringData', 'Hello World');
boomerang.set('numberData', 12345);
boomerang.set('objectData', {value: 'Hello World'});
boomerang.set('arrayData', [{value: 'Hello World'}, {value: 'Hello Boomerang'}]);
```

#### Set values with expire

> After 3 seconds this will return null.
```js
var seconds = 3;
boomerang.set('key', 'Hello World', seconds);
```