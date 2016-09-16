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

    var api = api || {};

    api = {

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

        removeItem: function (key) {
            localStorage.removeItem(key);
        }
    };

    function Boomerang (store) {

        if (api.check()) {
            this._store = store;
        }
    }

    Boomerang.prototype.get = function (key) {
        return api.getItem(key);
    };

    Boomerang.prototype.set = function (key, value) {
        api.setItem(key, value);
    };

    Boomerang.prototype.remove = function (key) {
        api.removeItem(key);
    };

    Boomerang.prototype.check = function () {
        return api.check();
    };

    api.create = function (store) {
        return new Boomerang(store);
    };

    return api;
}));