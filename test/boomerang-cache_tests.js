mocha.ui("tdd");

var assert = require('assert');
var boomerangCache = require('../src/boomerang-cache');

try {
    var boomerang = boomerangCache.create('test1');
}
catch (ex) {
    console.log(ex);
}

describe('Core -', function () {

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
});

