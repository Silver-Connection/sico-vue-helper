import { Transaction, TransactionModel } from "../transaction/lib";
import { CommonHelperFindCallback, CommonHelperAjaxCallback, CommonHelperAjaxErrorCallback, CommonHelperAjaxInject, CommonHelperAjaxOptions } from "./interface";

export { CommonHelperFindCallback, CommonHelperAjaxCallback, CommonHelperAjaxErrorCallback, CommonHelperAjaxInject, CommonHelperAjaxOptions } from "./interface";

export class CommonHelper {
    static defaultAjax: CommonHelperAjaxOptions =
        {
            url: undefined,
            action: undefined,
            message: undefined,
            path: undefined,
            setData: true,
            setNotify: true
        };

    /**
     * Send ajax request without settings data.
     * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    public static ajax(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions): void {
        let valid: CommonHelperAjaxOptions = {};

        if (options === undefined) {
            valid = $.extend(true, {}, CommonHelper.defaultAjax);
        } else {
            valid = $.extend(true, {}, CommonHelper.defaultAjax, options);
        }
        valid.setData = false;

        CommonHelper.ajaxBase(settings, valid, undefined);
    }

    /**
     * Ajax base function
     * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
     * @param {CommonHelperAjaxOptions} options - Request options
     * @param {Vue} $this - Request options
     */
    public static ajaxBase(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions, inject?: CommonHelperAjaxInject): void {
        if (settings === undefined || options === undefined) {
            return;
        }
        $.ajax(settings)
            .done((response: TransactionModel) => {
                let isTransaction = true;
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
            .fail((jqXHR, textStatus, errorThrown) => {
                if (options.setNotify) {
                    Transaction.notifyNow("Request", 2, errorThrown);
                }

                if (options.callbackError && typeof options.callbackError === "function") {
                    options.callbackError(jqXHR, textStatus, errorThrown);
                } else {
                    // tslint:disable-next-line:no-console
                    console.log(textStatus, errorThrown);
                }
            });
    }

    /**
     * Find polyfill
     * @param {Array} Array
     * @param {Function} callback callback function used for search
     */
    public static find(list: any[], callback: CommonHelperFindCallback) {
        if (typeof callback !== "function") {
            throw new TypeError("callback must be a function");
        }

        if (list === null || list === undefined || list.constructor !== Array) {
            return undefined;
        }

        // Makes sures is always has an positive integer as length.
        // tslint:disable-next-line:no-bitwise
        const length = list.length >>> 0;
        const thisArg = arguments[1];
        for (let i = 0; i < length; i++) {
            const element = list[i];
            if (callback.call(thisArg, element, i, list)) {
                return element;
            }
        }
    }
}