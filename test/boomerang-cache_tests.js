var assert = require('assert');
var boomerangCache = require('../src/boomerang-cache');

try {
    var boomerang = boomerangCache.create('test1');
}
catch (ex) {
    console.log(ex);
}

describe('LocalStorage -', function () {

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

        if (boomerang.check()) {
            // expect(boomerang.get(key)).toBe(value);
            assert.equal(boomerang.get(key), value, "We expect value to be " + value);
        }
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

        if (boomerang.check()) {
            assert.deepEqual(boomerang.getObject(key), value, "We expect type of value to be " + typeof(value));
        }
    });

    it('Testing objects with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerang.set(key, value);

        if (boomerang.check()) {
            assert.deepEqual(boomerang.getObject(key), value, "We expect type of value to be " + typeof(value));
        }
    });
});

