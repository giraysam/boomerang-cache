mocha.ui("tdd");

var assert = require('assert');
var boomerangCache = require('../src/boomerang-cache');

var boomerang = boomerangCache.create('test1');

suite('boomerang-cache', function () {
    setup(function () {

        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    teardown(function() {
        try {
            localStorage.clear();
        } catch(e) {}
    });

    test('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerang.set(key, value);

        if (boomerang.check()) {
            assert.equal(boomerang.get(key), value, "We expect value to be " + value);
        }
    });

    test('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerang.set(key, value);
        boomerang.remove(key);
        assert.equal(boomerang.get(key), null, 'We expect value to be null');
    });
});