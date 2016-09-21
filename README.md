# boomerang-cache - [![Build Status](https://travis-ci.org/giraysam/boomerang-cache.svg?branch=master)](https://travis-ci.org/giraysam/boomerang-cache)
boomerangCache is a client side caching library based on localStorage

API Reference
-------------
* create
* check
* set
* get
* getAll
* length
* remove
* clear

* * *

### BoomerangCache.create

> Creates a new bucket.

#### Arguments

1. `bucket` (**String**)
2. `options` (**Object**)
    * `type`: (**local** | **session**)

 
```js
var boomerang = BoomerangCache.create('bucket_1');
```

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

### BoomerangCache.get

> Returns the saved value for given key. If value is null or undefined it returns a default value.

#### Arguments

1. `key` (**String**)
2. `defaultValue` (**String**, **Number**, **Object**, **Array**)


```js
boomerang.get('key', 'Hello World'); // If value is null returns Hello World.
boomerang.set('key'); // returns value
```

### BoomerangCache.getAll

> Returns all saved values.

```js
boomerang.getAll();
// {key1: 'value1'}, {key2: 'value2'}
```


### BoomerangCache.length

> Returns all values count.

```js
boomerang.length();
// returns 2
```

### BoomerangCache.remove

> Remove a key from storage

#### Arguments

1. `key` (**String**)


```js
boomerang.remove('key');
```


### BoomerangCache.clear

> Empties storage


```js
boomerang.clear();
```