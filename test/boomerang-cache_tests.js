var assert = require('assert');
var boomerangCache = require('../src/boomerang-cache');

try {
    var boomerang = boomerangCache.create('test1');
}
catch (ex) {
    console.log(ex);
}

describe('LocalStorage Tests', function () {

    before(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    after(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    it('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerang.set(key, value);
        assert.equal(boomerang.get(key), value, "We expect value to be " + value);
    });

    it('Testing getAll()', function () {
        var key_1 = 'boomerang_object_1',
            value_1 = "boomerang_value_1",
            key_2 = 'boomerang_object_2',
            value_2 = "boomerang_value_2";

        boomerang.set(key_1, value_1);
        boomerang.set(key_2, value_2);

        var items = boomerang.getAll();

        assert.equal(items[key_1], value_1, 'We expect value to be ' + value_1);
        assert.equal(items[key_2], value_2, 'We expect value to be ' + value_2);

    });

    it('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerang.set(key, value);
        boomerang.remove(key);
        assert.equal(boomerang.get(key), null, 'We expect value to be null');
    });

    it('Testing clear()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerang.set(key, value);
        boomerang.clear();
        assert.equal(boomerang.get(key), null, 'We expect value to be null');
    });

    it('Testing arrays with set() and get()', function() {
        var key = 'boomerang_array',
            value = [{value: "boomerang_value"}];

        boomerang.set(key, value);
        assert.deepEqual(boomerang.getObject(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing objects with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerang.set(key, value);
        assert.deepEqual(boomerang.getObject(key), value, "We expect type of value to be " + typeof(value));
    });
});

