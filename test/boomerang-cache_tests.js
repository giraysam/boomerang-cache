var assert = require('assert');
var BoomerangCache = require('../src/boomerang-cache');

try {
    var boomerangLocal = BoomerangCache.create("boomerangLocal");
}
catch (ex) {
    console.log(ex);
}

try {
    var boomerangSession = BoomerangCache.create("boomerangSession", {storage: 'session'});
}
catch (ex) {
    console.log(ex);
}

try {
    var boomerangLocalEncrypt = BoomerangCache.create("boomerangLocalEncrypt", {encrypt: true});
}
catch (ex) {
    console.log(ex);
}

try {
    var boomerangSessionEncrypt = BoomerangCache.create("boomerangSessionEncrypt", {storage: 'session', encrypt: true});
}
catch (ex) {
    console.log(ex);
}

describe('LocalStorage Tests', function () {

    beforeEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    afterEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    it('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerangLocal.set(key, value);
        assert.equal(boomerangLocal.get(key), value, "We expect value to be " + value);
    });

    it('Testing number with set() and get()', function() {
        var key = 'boomerang_array',
            value = 123456789;

        boomerangLocal.set(key, value);
        assert.equal(boomerangLocal.get(key), value, "We expect value to be " + value);
    });

    it('Testing array with set() and get()', function() {
        var key = 'boomerang_array',
            value = [{value: "boomerang_value"}];

        boomerangLocal.set(key, value);
        assert.deepEqual(boomerangLocal.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing object with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerangLocal.set(key, value);
        assert.deepEqual(boomerangLocal.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing set() has expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocal.set(key, value, -1);
        assert.equal(boomerangLocal.get(key), null, "We expect type of value to be null");
    });

    it('Testing set() has not expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocal.set(key, value, 1);
        assert.notEqual(boomerangLocal.get(key), null, "We expect type of value to be not null");
    });

    it('Testing getAll()', function () {
        var key_1 = 'boomerang_object_1',
            value_1 = "boomerang_value_1",
            key_2 = 'boomerang_object_2',
            value_2 = "boomerang_value_2";

        boomerangLocal.set(key_1, value_1);
        boomerangLocal.set(key_2, value_2);

        var items = boomerangLocal.getAll();

        assert.equal(items[key_1], value_1, 'We expect value to be ' + value_1);
        assert.equal(items[key_2], value_2, 'We expect value to be ' + value_2);

    });

    it('Testing length()', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocal.clear();
        boomerangLocal.set(key, value);
        assert.equal(boomerangLocal.length(), 1, "We expect type of value to be 1");
    });

    it('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangLocal.set(key, value);
        boomerangLocal.remove(key);
        assert.equal(boomerangLocal.get(key), null, 'We expect value to be null');
    });

    it('Testing clear()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangLocal.set(key, value);
        boomerangLocal.clear();
        assert.equal(boomerangLocal.get(key), null, 'We expect value to be null');
    });
});


describe('SessionStorage Tests', function () {

    before(function() {
        try {
            sessionStorage.clear();
        }
        catch (ex) {}
    });

    after(function() {
        try {
            sessionStorage.clear();
        }
        catch (ex) {}
    });

    it('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerangSession.set(key, value);
        assert.equal(boomerangSession.get(key), value, "We expect value to be " + value);
    });

    it('Testing number with set() and get()', function() {
        var key = 'boomerang_array',
            value = 123456789;

        boomerangSession.set(key, value);
        assert.equal(boomerangSession.get(key), value, "We expect value to be " + value);
    });

    it('Testing array with set() and get()', function() {
        var key = 'boomerang_array',
            value = [{value: "boomerang_value"}];

        boomerangSession.set(key, value);
        assert.deepEqual(boomerangSession.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing object with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerangSession.set(key, value);
        assert.deepEqual(boomerangSession.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing set() has expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSession.set(key, value, -1);
        assert.equal(boomerangSession.get(key), null, "We expect type of value to be null");
    });

    it('Testing set() has not expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSession.set(key, value, 1);
        assert.notEqual(boomerangSession.get(key), null, "We expect type of value to be not null");
    });

    it('Testing getAll()', function () {
        var key_1 = 'boomerang_object_1',
            value_1 = "boomerang_value_1",
            key_2 = 'boomerang_object_2',
            value_2 = "boomerang_value_2";

        boomerangSession.set(key_1, value_1);
        boomerangSession.set(key_2, value_2);

        var items = boomerangSession.getAll();

        assert.equal(items[key_1], value_1, 'We expect value to be ' + value_1);
        assert.equal(items[key_2], value_2, 'We expect value to be ' + value_2);

    });

    it('Testing length()', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSession.clear();
        boomerangSession.set(key, value);
        assert.equal(boomerangSession.length(), 1, "We expect type of value to be 1");
    });

    it('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangSession.set(key, value);
        boomerangSession.remove(key);
        assert.equal(boomerangSession.get(key), null, 'We expect value to be null');
    });

    it('Testing clear()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangSession.set(key, value);
        boomerangSession.clear();
        assert.equal(boomerangSession.get(key), null, 'We expect value to be null');
    });
});


describe('LocalStorage Tests with Encryption', function () {

    beforeEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    afterEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    it('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerangLocalEncrypt.set(key, value);
        assert.equal(boomerangLocalEncrypt.get(key), value, "We expect value to be " + value);
    });

    it('Testing number with set() and get()', function() {
        var key = 'boomerang_array',
            value = 123456789;

        boomerangLocalEncrypt.set(key, value);
        assert.equal(boomerangLocalEncrypt.get(key), value, "We expect value to be " + value);
    });

    it('Testing array with set() and get()', function() {
        var key = 'boomerang_array',
            value = [{value: "boomerang_value"}];

        boomerangLocalEncrypt.set(key, value);
        assert.deepEqual(boomerangLocalEncrypt.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing object with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerangLocalEncrypt.set(key, value);
        assert.deepEqual(boomerangLocalEncrypt.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing set() has expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocalEncrypt.set(key, value, -1);
        assert.equal(boomerangLocalEncrypt.get(key), null, "We expect type of value to be null");
    });

    it('Testing set() has not expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocalEncrypt.set(key, value, 1);
        assert.notEqual(boomerangLocalEncrypt.get(key), null, "We expect type of value to be not null");
    });

    it('Testing getAll()', function () {
        var key_1 = 'boomerang_object_1',
            value_1 = "boomerang_value_1",
            key_2 = 'boomerang_object_2',
            value_2 = "boomerang_value_2";

        boomerangLocalEncrypt.set(key_1, value_1);
        boomerangLocalEncrypt.set(key_2, value_2);

        var items = boomerangLocalEncrypt.getAll();

        assert.equal(items[key_1], value_1, 'We expect value to be ' + value_1);
        assert.equal(items[key_2], value_2, 'We expect value to be ' + value_2);

    });

    it('Testing length()', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangLocalEncrypt.clear();
        boomerangLocalEncrypt.set(key, value);
        assert.equal(boomerangLocalEncrypt.length(), 1, "We expect type of value to be 1");
    });

    it('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangLocalEncrypt.set(key, value);
        boomerangLocalEncrypt.remove(key);
        assert.equal(boomerangLocalEncrypt.get(key), null, 'We expect value to be null');
    });

    it('Testing clear()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangLocalEncrypt.set(key, value);
        boomerangLocalEncrypt.clear();
        assert.equal(boomerangLocalEncrypt.get(key), null, 'We expect value to be null');
    });
});

describe('SessionStorage Tests with Encryption', function () {

    beforeEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    afterEach(function() {
        try {
            localStorage.clear();
        }
        catch (ex) {}
    });

    it('Testing set() and get()', function () {
        var key = "boomerang_key",
            value = "boomerang_value";

        boomerangSessionEncrypt.set(key, value);
        assert.equal(boomerangSessionEncrypt.get(key), value, "We expect value to be " + value);
    });

    it('Testing number with set() and get()', function() {
        var key = 'boomerang_array',
            value = 123456789;

        boomerangSessionEncrypt.set(key, value);
        assert.equal(boomerangSessionEncrypt.get(key), value, "We expect value to be " + value);
    });

    it('Testing array with set() and get()', function() {
        var key = 'boomerang_array',
            value = [{value: "boomerang_value"}];

        boomerangSessionEncrypt.set(key, value);
        assert.deepEqual(boomerangSessionEncrypt.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing object with set() and get()', function() {
        var key = 'boomerang_object',
            value = {value: "boomerang_value"};

        boomerangSessionEncrypt.set(key, value);
        assert.deepEqual(boomerangSessionEncrypt.get(key), value, "We expect type of value to be " + typeof(value));
    });

    it('Testing set() has expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSessionEncrypt.set(key, value, -1);
        assert.equal(boomerangSessionEncrypt.get(key), null, "We expect type of value to be null");
    });

    it('Testing set() has not expire', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSessionEncrypt.set(key, value, 1);
        assert.notEqual(boomerangSessionEncrypt.get(key), null, "We expect type of value to be not null");
    });

    it('Testing getAll()', function () {
        var key_1 = 'boomerang_object_1',
            value_1 = "boomerang_value_1",
            key_2 = 'boomerang_object_2',
            value_2 = "boomerang_value_2";

        boomerangSessionEncrypt.set(key_1, value_1);
        boomerangSessionEncrypt.set(key_2, value_2);

        var items = boomerangSessionEncrypt.getAll();

        assert.equal(items[key_1], value_1, 'We expect value to be ' + value_1);
        assert.equal(items[key_2], value_2, 'We expect value to be ' + value_2);

    });

    it('Testing length()', function() {
        var key = 'boomerang_object',
            value = "boomerang_value";

        boomerangSessionEncrypt.clear();
        boomerangSessionEncrypt.set(key, value);
        assert.equal(boomerangSessionEncrypt.length(), 1, "We expect type of value to be 1");
    });

    it('Testing remove()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangSessionEncrypt.set(key, value);
        boomerangSessionEncrypt.remove(key);
        assert.equal(boomerangSessionEncrypt.get(key), null, 'We expect value to be null');
    });

    it('Testing clear()', function() {
        var key = 'boomerang_key',
            value = "boomerang_value";

        boomerangSessionEncrypt.set(key, value);
        boomerangSessionEncrypt.clear();
        assert.equal(boomerangSessionEncrypt.get(key), null, 'We expect value to be null');
    });
});
