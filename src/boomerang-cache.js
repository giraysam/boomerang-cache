/**
 * Boomerang Cache
 *
 * Boomerang Cache is a client side caching library
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

    var api, localStorageApi, utils;

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
            }
        }
    }());

    /**
     * localStorageApi
     *
     * @type {{check, getItem, setItem, getAll, getObject, setObject, removeItem, clear}}
     */
    localStorageApi = (function() {

        return {

            check: function() {

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
                        values[keySplit[1]] = localStorage.getItem(keys[i]);
                    }
                }

                return values;
            },

            getObject: function(key) {
                var obj = localStorage.getItem(key);
                return JSON.parse(obj);
            },

            setObject: function(key, value) {
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(value));
            },

            removeItem: function(key) {
                return localStorage.removeItem(key);
            },

            clear: function() {
                localStorage.clear();
            }
        }
    }());

    /**
     * api
     *
     * @type {{create}}
     */
    api = (function() {

        return {

            create: function(store, options) {
                var defaultOptions = {
                    type: 'local'
                };

                options = utils.extend(defaultOptions, options);

                return new Boomerang(store, options);
            }
        }
    }());

    /**
     * ApiFactory
     *
     * @param apiType
     * @returns {*}
     * @constructor
     */
    function ApiFactory(apiType) {
        var engine;

        if (apiType == 'local') {
            engine = localStorageApi;
        }

        return engine;
    }

    /**
     * Boomerang main instance
     *
     * @param store
     * @param options
     * @constructor
     */
    function Boomerang(store, options) {

        this.options = options;
        this.factory = new ApiFactory(this.options.type);

        if (typeof this.factory == 'undefined') {
            throw "Undefined factory";
        }

        if (this.factory.check()) {
            this.namespace = utils.trim(store) != '' ? utils.trim(store) : 'boomerang-cache';
        }
    }

    /**
     * set
     *
     * @param key
     * @param value
     * @returns {*}
     */
    Boomerang.prototype.set = function(key, value) {

        key = utils.namespaceKey(this.namespace, key);

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

    /**
     * get
     *
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    Boomerang.prototype.get = function(key, defaultValue) {

        key = utils.namespaceKey(this.namespace, key);

        var value = this.factory.getItem(key);

        // check if item is an object
        if (typeof value !== 'undefined' || value != null) {
            try {
                var objValue = JSON.parse(value);
                return objValue
            } catch (e) {
                
            }
        }

        return (typeof value !== 'undefined') ? value : defaultValue;
    };

    /**
     * getAll
     *
     * @returns {*}
     */
    Boomerang.prototype.getAll = function() {

        return this.factory.getAll(this.namespace);
    };

    /**
     * getObject
     *
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    Boomerang.prototype.getObject = function(key, defaultValue) {

        key = utils.namespaceKey(this.namespace, key);

        var value = this.factory.getObject(key);

        return (typeof value !== 'undefined') ? value : defaultValue;
    };

    /**
     * clear
     */
    Boomerang.prototype.clear = function() {
        this.factory.clear();
    };

    /**
     * remove
     *
     * @param key
     * @returns {*}
     */
    Boomerang.prototype.remove = function(key) {

        key = utils.namespaceKey(this.namespace, key);

        return this.factory.removeItem(key);
    };

    /**
     * check browser support
     *
     * @returns true|false
     */
    Boomerang.prototype.check = function() {
        return this.factory.check();
    };

    return api;
}));