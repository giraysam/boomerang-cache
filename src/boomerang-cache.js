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

}(this, function (root, BoomerangCache) {
    'use strict';
    
    function isAvailable() {
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
    }

    function getItem(key) {
        return localStorage.getItem(key);
    }

    function setItem(key, value) {
        localStorage.removeItem(key);
        localStorage.setItem(key, value);
    }

    function removeItem(key) {
        localStorage.removeItem(key);
    }

    root.boomerang = function (store) {

        if (this.isAvailable()) {
            this._store = store;
        }
    };

    root.boomerang.prototype.get = function (key) {
        return getItem(key);
    };

    root.boomerang.prototype.set = function (key, value) {
        setItem(key, value);
    };

    root.boomerang.prototype.remove = function (key) {
        removeItem(key);
    };

    root.boomerang.prototype.isAvailable = function () {

        return isAvailable();
    };

    BoomerangCache.create = function (store) {
        return new root.boomerang(store);
    };

    return BoomerangCache;
}));