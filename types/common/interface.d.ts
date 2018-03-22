/// <reference types="jquery" />
import { TransactionModel } from "../transaction/interface";
export declare type CommonHelperFindCallback = (el: any, index?: number) => boolean;
export declare type CommonHelperAjaxCallback = (data?: any) => void;
export declare type CommonHelperAjaxErrorCallback = (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus, errorThrown: string) => void;
export declare type CommonHelperAjaxInject = (response: TransactionModel) => void;
export interface CommonHelperAjaxOptions {
    /**
     * Ajax URL
     * @default null
     * @type string
     */
    url?: string;
    /**
     * Overwrite tarnsaction action string
     * @default null
     * @type string
     */
    action?: string;
    /**
     * Overwrite tarnsaction message
     * @default null
     * @type string
     */
    message?: string;
    /**
     * Path in Vue model for sending and receivng
     * @default null
     * @type string
     */
    path?: string;
    /**
     * Callback function success
     * @default null
     * @type string
     */
    callback?: CommonHelperAjaxCallback;
    /**
     * Callback function fail
     * @default null
     * @type string
     */
    callbackError?: CommonHelperAjaxErrorCallback;
    /**
     * Update model on success
     * @default null
     * @type string
     */
    setData?: boolean;
    /**
     * Display transaction on success
     * @default null
     * @type string
     */
    setNotify?: boolean;
}
