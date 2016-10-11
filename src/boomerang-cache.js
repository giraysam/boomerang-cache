/**
 * BoomerangCache Cache
 *
 * BoomerangCache is a client side caching library
 */
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

    var api, utils;

    /**
     * BoomerangCache main instance
     *
     * @param {string} store bucket name
     * @param {object} options options object
     */
    function BoomerangCache(store, options) {

        this.options = options;
        this.storage = this.api[this.options.storage];

        if (typeof this.storage == 'undefined') {
            throw "Undefined factory";
        }

        if (this.storage.check()) {
            this.namespace = utils.trim(store) != '' ? utils.trim(store) : 'BoomerangCache';
        }
    }

    BoomerangCache.prototype.hasExpired = function (key) {

        var itemValue = JSON.parse(this.storage.getItem(key)),
            expireValue;

        if (itemValue && itemValue['expiry']) {
            expireValue = parseInt(itemValue['expiry'], 10);

            if (expireValue && expireValue < utils.currentTime()) {
                return true;
            }
        }

        return false;
    };

    /**
     * utils
     *
     * @type {{extend}}
     */
    utils = (function() {

        return {

            extend: function() {
                for (var i = 1; i < arguments.length; i++) {
                    for (var key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key)) {
                            arguments[0][key] = arguments[i][key];
                        }
                    }
                }

                return arguments[0];
            },

            trim: function(x) {
                return x.replace(/^\s+|\s+$/gm,'');
            },

            namespaceKey: function (namespace, key) {
                return namespace + ":" + key;
            },

            currentTime: function () {
                return new Date().getTime();
            }
        }
    }());

    /**
     * BoomerangCache is a client side caching library based on localStorage and sessionStorage.
     *
     * @name BoomerangCache Api
     *
     * @namespace BoomerangCache
     * @version 1.0.4
     * @copyright 2016
     * @author [giraysam]{@link http://giraysam.github.io} - [feyyazakkus]{@link https://github.com/feyyazakkus}
     * @file
     */
    api = (function() {

        var instance;

        return {
            /**
             * This method to create a BoomerangCache instance.
             *
             * @param {string} store - store name to create a multiple bucket
             * @param {object} options - type: (local | session)
             *
             * @example
             * var boomerang = BoomerangCache.create('bucket1');
             *
             * @returns {BoomerangCache}
             */
            create: function(store, options) {
                var defaultOptions = {
                    storage: 'local'
                };

                options = utils.extend(defaultOptions, options);

                instance = new BoomerangCache(store, options);

                return instance;
            }
        }
    }());

    BoomerangCache.prototype.api = {

        local: {

            check: function() {

                var key = '__BoomerangCache__',
                    value = 'BoomerangCache';

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

            getItem: function(key) {
                return localStorage.getItem(key);
            },

            setItem: function(key, value) {
                localStorage.removeItem(key);
                localStorage.setItem(key, value);
            },

            getAll: function(namespace) {
                var keys = Object.keys(localStorage),
                    values = {},
                    i = keys.length;

                while (i--) {
                    var keySplit = keys[i].split(':');

                    if (keySplit[0] == namespace) {
                        values[keySplit[1]] = JSON.parse(localStorage.getItem(keys[i]))['value'];
                    }
                }

                return values;
            },

            getObject: function(key) {
                var obj = localStorage.getItem(key);
                return JSON.parse(obj);
            },

            removeItem: function(key) {
                return localStorage.removeItem(key);
            },

            clear: function() {
                localStorage.clear();
            }
        },

        session: {

            check: function() {

                var key = '__BoomerangCache__',
                    value = 'BoomerangCache';

                try {
                    sessionStorage.setItem(key, value);
                    sessionStorage.removeItem(key);
                    return true;
                }
                catch (exc) {
                    console.log('error');
                    return false;
                }
            },

            getItem: function(key) {
                return sessionStorage.getItem(key);
            },

            setItem: function(key, value) {
                sessionStorage.removeItem(key);
                sessionStorage.setItem(key, value);
            },

            getAll: function(namespace) {
                var keys = Object.keys(sessionStorage),
                    values = {},
                    i = keys.length;

                while (i--) {
                    var keySplit = keys[i].split(':');

                    if (keySplit[0] == namespace) {
                        values[keySplit[1]] = JSON.parse(sessionStorage.getItem(keys[i]))['value'];
                    }
                }

                return values;
            },

            getObject: function(key) {
                var obj = sessionStorage.getItem(key);
                return JSON.parse(obj);
            },

            removeItem: function(key) {
                return sessionStorage.removeItem(key);
            },

            clear: function() {
                sessionStorage.clear();
            }
        }
    };

    /**
     * Set a key to a particular value or a hash object (Object or Array) under a hash key.
     *
     * @method set
     *
     * @param {string} key required
     * @param {string|number|object|array} value required
     * @param {number} seconds optional
     *
     * @example <caption>Set values unlimited.</caption>
     * boomerang.set('stringData', 'Hello World');
     * boomerang.set('numberData', 12345);
     * boomerang.set('objectData', {value: 'Hello World'});
     * boomerang.set('arrayData', [{value: 'Hello World'}, {value: 'Hello Boomerang'}]);
     *
     * @example <caption>Set values with expire.</caption>
     * // After 3 seconds this will return null.
     * var seconds = 3;
     * boomerang.set('key', 'Hello World', seconds);
     *
     * @returns {string|number|object|array}
     */
    BoomerangCache.prototype.set = function(key, value, seconds) {

        var namespaceKey = utils.namespaceKey(this.namespace, key),
            itemValue = {
                value: value
            };

        if (seconds) {
            var s = seconds * 1000;
            itemValue['expiry'] = utils.currentTime() + s;
        }

        if (typeof value === 'undefined') {
            return this.storage.removeItem(namespaceKey);
        }

        // if value is string
        this.storage.setItem(namespaceKey, JSON.stringify(itemValue));
        return value;
    };

    /**
     * Returns the saved value for given key. If value is null or undefined it returns a default value.
     *
     * @method get
     *
     * @param {string} key required
     * @param {string|number|object|array} defaultValue optional
     *
     * @example
     * boomerang.get('key', 'Hello World');
     * // If value is null returns Hello World.
     *
     * @returns {string|number|object|array}
     */
    BoomerangCache.prototype.get = function(key, defaultValue) {

        var namespaceKey = utils.namespaceKey(this.namespace, key);

        if (this.hasExpired(namespaceKey)) {
            this.storage.removeItem(namespaceKey);
            return null;
        }

        var itemValue = JSON.parse(this.storage.getItem(namespaceKey));

        // check if item is an object
        if (itemValue && (typeof itemValue['value'] !== 'undefined' || itemValue['value'] != null)) {

            try {
                return itemValue['value'];
            }
            catch (e) {}
        }
        else {
            return defaultValue || null;
        }
    };

    /**
     * Returns all saved values.
     *
     * @method getAll
     *
     * @example
     * boomerang.getAll();
     * // {key1: 'value1'}, {key2: 'value2'}
     *
     * @returns {object}
     */
    BoomerangCache.prototype.getAll = function() {

        return this.storage.getAll(this.namespace);
    };

    /**
     * Remove a key from storage.
     *
     * @method remove
     *
     * @param {string} key required
     *
     * @example
     * boomerang.remove('key');
     *
     * @returns {object}
     */
    BoomerangCache.prototype.remove = function(key) {

        key = utils.namespaceKey(this.namespace, key);
        return this.storage.removeItem(key);
    };

    /**
     * Returns all values count.
     *
     * @method length
     *
     * @example
     * boomerang.length();
     * // returns 2
     *
     * @returns Number
     */
    BoomerangCache.prototype.length = function() {

        return Object.keys(this.storage.getAll(this.namespace)).length;
    };

    /**
     * Empties storage.
     *
     * @method clear
     *
     * @example
     * boomerang.clear();
     */
    BoomerangCache.prototype.clear = function() {
        this.storage.clear();
    };

    /**
     * Check browser support.
     *
     * @method check
     *
     * @example
     * boomerang.check();
     * // returns true or false
     *
     * @returns true|false
     */
    BoomerangCache.prototype.check = function() {
        return this.storage.check();
    };

    return api;
}));