/// <reference types="jquery" />
import { CommonHelperFindCallback, CommonHelperAjaxInject, CommonHelperAjaxOptions } from "./interface";
export { CommonHelperFindCallback, CommonHelperAjaxCallback, CommonHelperAjaxErrorCallback, CommonHelperAjaxInject, CommonHelperAjaxOptions } from "./interface";
export declare class CommonHelper {
    static defaultAjax: CommonHelperAjaxOptions;
    /**
     * Send ajax request without settings data.
     * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    static ajax(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions): void;
    /**
     * Ajax base function
     * @param {JQueryAjaxSettings} settings - jQuery ajaxy settings
     * @param {CommonHelperAjaxOptions} options - Request options
     * @param {Vue} $this - Request options
     */
    static ajaxBase(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions, inject?: CommonHelperAjaxInject): void;
    /**
     * Find polyfill
     * @param {Array} Array
     * @param {Function} callback callback function used for search
     */
    static find(list: any[], callback: CommonHelperFindCallback): any;
}
