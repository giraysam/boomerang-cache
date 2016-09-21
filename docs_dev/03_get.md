### BoomerangCache.get

> Returns the saved value for given key. If value is null or undefined it returns a default value.

#### Arguments

1. `key` (**String**)
2. `defaultValue` (**String**, **Number**, **Object**, **Array**)


```js
boomerang.get('key', 'Hello World'); // If value is null returns Hello World.
boomerang.set('key'); // returns value
```