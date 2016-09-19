(function (root, factory) {

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && typeof module.exports) {
            exports = module.exports = factory(root, exports);
        }
    }
    else if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.BoomerangCache = factory(root, exports);
        });
    }
    else {
        root.BoomerangCache = factory(root, {});
    }

}(this, function () {
    'use strict';

    var api, localStorageApi, utils;

    utils = {
        extend: function () {
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }

            return arguments[0];
        }
    };

    localStorageApi = {
        check: function () {

            var key = '__boomerangCache__',
                value = 'boomerang';

            try {
                localStorage.setItem(key, value);
                localStorage.removeItem(key);
                return true;
            }
            catch (exc) {
                console.log('error');
                return false;
            }
        },

        getItem: function (key) {
            return localStorage.getItem(key);
        },

        setItem: function (key, value) {
            localStorage.removeItem(key);
            localStorage.setItem(key, value);
        },

        getObject: function (key, value) {
            var obj = localStorage.getItem(key);
            return JSON.parse(obj);
        },

        setObject: function (key, value) {
            localStorage.removeItem(key);
            localStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: function (key) {
            return localStorage.removeItem(key);
        },

        clear: function () {
            localStorage.clear();
        }
    };

    api = {

        create: function (store, options) {
            var defaultOptions = {
                type: 'local'
            };

            options = utils.extend(defaultOptions, options);

            return new Boomerang(store, options);
        }
    };
    
    function CacheFactory(cacheType) {
        var cacheEngine;

        if (cacheType == 'local') {
            cacheEngine = localStorageApi;
        }

        return cacheEngine;
    }

    function Boomerang (store, options) {

        this.options = options;
        this.factory = new CacheFactory(this.options.type);

        if (typeof this.factory == 'undefined') {
            throw "Undefined factory";
        }

        if (this.factory.check()) {
            this._store = store;
        }
    }

    Boomerang.prototype.get = function (key, defaultValue) {

        var value = this.factory.getItem(key);

        return (typeof value !== 'undefined') ? value : defaultValue;
    };

    Boomerang.prototype.getObject = function (key, defaultValue) {

        var value = this.factory.getObject(key);

        return (typeof value !== 'undefined') ? value : defaultValue;
    };

    Boomerang.prototype.set = function (key, value) {

        if (typeof value === 'undefined') {
            return this.factory.removeItem(key);
        }

        // if value is an array or object
        if (typeof value === 'object') {
            this.factory.setObject(key, value);
            return value;
        }

        // if value is string
        this.factory.setItem(key, value);
        return value;
    };

    Boomerang.prototype.clear = function () {
        this.factory.clear();
    };

    Boomerang.prototype.remove = function (key) {
        return this.factory.removeItem(key);
    };

    Boomerang.prototype.check = function () {
        return this.factory.check();
    };

    return api;
}));