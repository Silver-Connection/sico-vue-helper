/**
 * @summary     Vue.js Helper
 * @description Transaction Model & Vue Ajax helpers
 * @version     1.0.1
 * @file        dist/sico.vue-helpers.umd.js
 * @dependencie Vue.js, jQuery
 * @author      Silver Connection OHG
 * @contact     Kiarash G. <kiarash@si-co.net>
 * @copyright   Copyright 2018 Silver Connection OHG
 *
 * This source file is free software, available under the following license:
 *   MIT license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Silver-Connection/sico-vue-helpers
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.sico = {})));
}(this, (function (exports) { 'use strict';

    (function (TransactionCode) {
        /**
         * No Action to take
         */
        TransactionCode[TransactionCode["NoAction"] = 0] = "NoAction";
        /**
         * Transaction was successful
         */
        TransactionCode[TransactionCode["Success"] = 1] = "Success";
        /**
         * Transaction returned an error
         */
        TransactionCode[TransactionCode["Error"] = 2] = "Error";
        /**
         * Transaction canceled by user
         */
        TransactionCode[TransactionCode["Canceled"] = 3] = "Canceled";
        /**
         * Access Denied
         */
        TransactionCode[TransactionCode["AccessDenied"] = 11] = "AccessDenied";
    })(exports.TransactionCode || (exports.TransactionCode = {}));

    var Transaction = /** @class */ (function () {
        /**
         * Load configurations and create Transaction Object
         * @constructor
         * @param {any} opt - Payload Data
         */
        function Transaction(data) {
            this.Action = "";
            this.Code = 0;
            this.Data = data == undefined ? undefined : data;
            this.Message = "";
        }
        /**
         * Check if model implements TransactionModel
         * @param {TransactionModel} model - Transaction Model
         */
        Transaction.isTransaction = function (model) {
            if (model == undefined || typeof model != "object") {
                return false;
            }
            if ("Action" in model
                && "Code" in model
                && "Data" in model
                && "Message" in model) {
                return true;
            }
            return false;
        };
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {any} model - Transaction Model
         */
        Transaction.notify = function (model) {
            if (Transaction.isTransaction(model)) {
                Transaction.notifyNow(model.Action, model.Code, model.Message);
            }
        };
        /**
         * Toggle remarkable-bootstrap-notify
         * @param {string} action
         * @param {Transaction Code | number} code
         * @param {string} message
         */
        Transaction.notifyNow = function (action, code, message) {
            switch (code) {
                case 0:
                    $.notify({
                        icon: "fa fa-ellipsis-h",
                        message: message,
                        title: "<strong>" + (action === "" ? "Init" : action) + "</strong><br/>",
                    }, Transaction.NOTIFY_INFO);
                    break;
                case 1:
                    $.notify({
                        icon: "fa fa-floppy-o",
                        message: message,
                        title: "<strong>" + action + "</strong><br/>",
                    }, Transaction.NOTIFY_SUCCESS);
                    break;
                default:
                    $.notify({
                        icon: "fa fa-exclamation",
                        message: message,
                        title: "<strong>" + (action === "" ? "Error" : action) + "</strong><br/>",
                    }, Transaction.NOTIFY_ERROR);
                    break;
            }
        };
        /**
         * Toggle remarkable-bootstrap-notify
         */
        Transaction.prototype.$noify = function () {
            Transaction.notifyNow(this.Action, this.Code, this.Message);
        };
        /**
         * Export Vue.js model function
         */
        Transaction.prototype.$toVue = function () {
            var $this = this;
            return function () { return $this; };
        };
        /**
         * Export as JSON
         */
        Transaction.prototype.$toJson = function () {
            return JSON.stringify(this);
        };
        Transaction.NOTIFY_INFO = {
            delay: 5000,
            icon_type: "class",
            type: "info",
        };
        Transaction.NOTIFY_SUCCESS = {
            delay: 5000,
            icon_type: "class",
            type: "success",
        };
        Transaction.NOTIFY_ERROR = {
            delay: 5000,
            icon_type: "class",
            type: "danger",
        };
        return Transaction;
    }());

    var CommonHelper = /** @class */ (function () {
        function CommonHelper() {
        }
        /**
         * Send ajax request without settings data.
         * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
         * @param {CommonHelperAjaxOptions} options - Request options
         */
        CommonHelper.ajax = function (settings, options) {
            var valid = {};
            if (options === undefined) {
                valid = $.extend(true, {}, CommonHelper.defaultAjax);
            }
            else {
                valid = $.extend(true, {}, CommonHelper.defaultAjax, options);
            }
            valid.setData = false;
            CommonHelper.ajaxBase(settings, valid, undefined);
        };
        /**
         * Ajax base function
         * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
         * @param {CommonHelperAjaxOptions} options - Request options
         * @param {Vue} $this - Request options
         */
        CommonHelper.ajaxBase = function (settings, options, inject) {
            if (settings === undefined || options === undefined) {
                return;
            }
            $.ajax(settings)
                .done(function (response) {
                var isTransaction = true;
                if (!Transaction.isTransaction(response)) {
                    isTransaction = false;
                    response = new Transaction(response);
                    response.Code = 1;
                }
                if (inject && typeof inject === "function") {
                    inject(response);
                }
                if (response.Code < 2 && options.callback && typeof options.callback === "function") {
                    options.callback(isTransaction ? response : response.Data);
                }
                if (options.setNotify) {
                    Transaction.notifyNow(options.action === undefined ? response.Action : options.action, response.Code, options.message === undefined ? response.Message : options.message);
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                if (options.setNotify) {
                    Transaction.notifyNow("Request", 2, errorThrown);
                }
                if (options.callbackError && typeof options.callbackError === "function") {
                    options.callbackError(jqXHR, textStatus, errorThrown);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log(textStatus, errorThrown);
                }
            });
        };
        /**
         * Find polyfill
         * @param {Array} Array
         * @param {Function} callback callback function used for search
         */
        CommonHelper.find = function (list, callback) {
            if (typeof callback !== "function") {
                throw new TypeError("callback must be a function");
            }
            if (list === null || list === undefined || list.constructor !== Array) {
                return undefined;
            }
            // Makes sures is always has an positive integer as length.
            // tslint:disable-next-line:no-bitwise
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            for (var i = 0; i < length; i++) {
                var element = list[i];
                if (callback.call(thisArg, element, i, list)) {
                    return element;
                }
            }
        };
        CommonHelper.defaultAjax = {
            url: undefined,
            action: undefined,
            message: undefined,
            path: undefined,
            setData: true,
            setNotify: true
        };
        return CommonHelper;
    }());

    function install(Vue, options) {
        /**
         * Get Value from given Path
         * @param {String} path to data
         */
        Vue.prototype.$path = function (path) {
            if ((path === undefined || path === "" || path === "undefined")) {
                return this.$data;
            }
            var list = this.$data[path];
            if (path.indexOf(".") > -1) {
                var paths = path.split(".");
                for (var i = 0; i < paths.length; i++) {
                    if (i === 0) {
                        list = this.$data[paths[i]];
                    }
                    else {
                        var t = paths[i];
                        var arrayConvert = pathArrayConvert(paths[i]);
                        if (arrayConvert !== undefined) {
                            list = list[arrayConvert.base][arrayConvert.index];
                        }
                        else {
                            list = list[t];
                        }
                    }
                }
            }
            else {
                var arrayConvert = pathArrayConvert(path);
                if (arrayConvert !== undefined) {
                    list = this.$data[arrayConvert.base][arrayConvert.index];
                }
            }
            return list;
        };
    }
    function pathArrayConvert(path) {
        var startPos = path.indexOf("[");
        if (startPos > -1) {
            var index = path.substr(startPos + 1).replace("]", "");
            return {
                base: path.substr(0, startPos),
                index: path.substr(startPos + 1).replace("]", ""),
            };
        }
        return undefined;
    }

    function install$1(Vue, options) {
        /**
         * Find polyfill
         * @param {String | Array} path to data or array
         * @param {Function} callback callback function used for search
         */
        Vue.prototype.$find = function (path, callback) {
            var list = undefined;
            if (path && path.constructor === Array) {
                list = path;
            }
            if (typeof path === "string" || path instanceof String) {
                list = this.$path(path.toString());
            }
            if (list === undefined) {
                return undefined;
            }
            return CommonHelper.find(list, callback);
        };
    }

    function install$2(Vue, options) {
        /**
         * Send a GET request to given URL
         * @param {CommonHelperAjaxOptions} options - Request options
         */
        Vue.prototype.$ajaxGet = function (options) {
            if (options == undefined) {
                return;
            }
            var valid = ajaxOptionsValidate(options);
            ajax({
                contentType: "application/json",
                dataType: "json",
                method: "GET",
                url: valid.url,
            }, valid, this);
        };
        /**
         * Send a POST request to given URL
         * @param {CommonHelperAjaxOptions} options - Request options
         */
        Vue.prototype.$ajaxPost = function (options) {
            if (options == undefined) {
                return;
            }
            var valid = ajaxOptionsValidate(options);
            ajax({
                contentType: "application/json",
                data: JSON.stringify(this.$path(valid.path)),
                dataType: "json",
                method: "POST",
                url: valid.url,
            }, valid, this);
        };
        /**
         * Send a PUT request to given URL
         * @param {CommonHelperAjaxOptions} options - Request options
         */
        Vue.prototype.$ajaxPut = function (options) {
            if (options == undefined) {
                return;
            }
            var valid = ajaxOptionsValidate(options);
            ajax({
                contentType: "application/json",
                data: JSON.stringify(this.$path(valid.path)),
                dataType: "json",
                method: "PUT",
                url: valid.url,
            }, valid, this);
        };
        /**
         * Send a DELETE request to given URL
         * @param {CommonHelperAjaxOptions} options - Request options
         */
        Vue.prototype.$ajaxDelete = function (options) {
            if (options == undefined) {
                return;
            }
            var valid = ajaxOptionsValidate(options);
            valid.setData = false;
            ajax({
                contentType: "application/json",
                dataType: "json",
                method: "DELETE",
                url: valid.url,
            }, valid, this);
        };
    }
    function ajaxOptionsValidate(options) {
        if (options === undefined) {
            throw new TypeError("VueHelper ajax options are not set!");
        }
        if (typeof options === "string" || options instanceof String) {
            var valid_1 = $.extend(true, {}, CommonHelper.defaultAjax);
            valid_1.url = options.toString();
            return valid_1;
        }
        var valid = $.extend(true, {}, CommonHelper.defaultAjax, options);
        if (valid.url === undefined) {
            throw new TypeError("VueHelper ajax URL not set!");
        }
        if (valid.action == "hide") {
            valid.setNotify = false;
        }
        return valid;
    }
    function ajax(settings, options, vue) {
        CommonHelper.ajaxBase(settings, options, function (response) {
            if (vue != undefined) {
                vue.$set(vue, "Action", response.Action);
                vue.$set(vue, "Code", response.Code);
                vue.$set(vue, "Message", response.Message);
                if (options.setData && response.Code < 2) {
                    // Get path
                    if (options.path == undefined || options.path === "" || options.path === "undefined") {
                        vue.$set(vue, "Data", response.Data);
                    }
                    else {
                        var pointer = pathSplitLastLevel(options.path);
                        if (pointer !== undefined) {
                            // console.log(pointer);
                            var partial = vue.$path(pointer.base);
                            vue.$set(partial, pointer.name, response.Data);
                        }
                        // const cmd = "vue.$data." + options.path + " = response.Data;";
                        // // tslint:disable-next-line:no-eval
                        // eval(cmd);
                    }
                }
            }
        });
    }
    function pathSplitLastLevel(path) {
        if (path.indexOf(".") > -1) {
            var paths = path.split(".");
            var base = "";
            var name_1 = "";
            for (var i = 0; i < paths.length; i++) {
                if (i === paths.length - 1) {
                    var arrayConvert = pathArrayConvert(paths[i]);
                    if (arrayConvert !== undefined) {
                        base += "." + arrayConvert.base;
                        name_1 = arrayConvert.index;
                    }
                    else {
                        name_1 = paths[i];
                    }
                }
                else {
                    base += "." + paths[i];
                }
            }
            return { base: base.substr(1), name: name_1 };
        }
        return undefined;
    }

    var VueHelper = /** @class */ (function () {
        function VueHelper() {
        }
        VueHelper.install = function (Vue, options) {
            install(Vue, options);
            install$1(Vue, options);
            install$2(Vue, options);
        };
        return VueHelper;
    }());

    exports.Transaction = Transaction;
    exports.Common = CommonHelper;
    exports.VuePlugins = VueHelper;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sico.vue-helpers.umd.js.map
