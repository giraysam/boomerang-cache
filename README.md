# boomerang-cache - [![Build Status](https://travis-ci.org/giraysam/boomerang-cache.svg?branch=master)](https://travis-ci.org/giraysam/boomerang-cache)
boomerangCache is a client side caching library based on localStorage

API Reference
-------------
`create`, `check`, `set`, `get`, `getAll`, `remove`, `clear`

* * *

### BoomerangCache.create

> Creates a new bucket.

#### Arguments

1. `bucket` (**String**)
2. `options` (**Object**)
    * `type`: (**local** | **session**)

### BoomerangCache.set

> Set a key to a particular value or a hash object (Object or Array) under a hash key.

#### Arguments

1. `key` (**String**)
2. `value` (**String**, **Number**, **Object**, **Array**)

*Example*

```js
boomerang.set('stringData', 'Hello World');
boomerang.set('numberData', 12345);
boomerang.set('objectData', {value: 'Hello World'});
boomerang.set('arrayData', [{value: 'Hello World'}, {value: 'Hello Boomerang'}]);
```
