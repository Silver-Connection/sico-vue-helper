import { TransactionModel } from "../transaction/interface";

export type CommonHelperFindCallback = (el: any, index?: number) => boolean;

export type CommonHelperAjaxCallback = (data?: any) => void;
export type CommonHelperAjaxErrorCallback = (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus, errorThrown: string) => void;
export type CommonHelperAjaxInject = (response: TransactionModel) => void;

export interface CommonHelperAjaxOptions {
    /**
     * Ajax URL
     * @default null
     * @type string
     */
    url?: string;

    /**
     * Overwrite tarnsaction action message
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
     * Callback function success
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
     * Display transaction
     * @default null
     * @type string
     */
    setNotify?: boolean;
}
