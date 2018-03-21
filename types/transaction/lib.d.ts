import { TransactionCode } from "./enum";
import { TransactionModel } from "./interface";
export { TransactionCode } from "./enum";
export { TransactionModel } from "./interface";
export declare class Transaction<T> implements TransactionModel {
    static NOTIFY_INFO: {
        delay: number;
        icon_type: string;
        type: string;
    };
    static NOTIFY_SUCCESS: {
        delay: number;
        icon_type: string;
        type: string;
    };
    static NOTIFY_ERROR: {
        delay: number;
        icon_type: string;
        type: string;
    };
    /**
     * Check if model implements TransactionModel
     * @param {TransactionModel} model - Transaction Model
     */
    static isTransaction(model: any): model is TransactionModel;
    /**
     * Toggle remarkable-bootstrap-notify
     * @param {any} model - Transaction Model
     */
    static notify(model: any): void;
    /**
     * Toggle remarkable-bootstrap-notify
     * @param {string} action
     * @param {Transaction Code | number} code
     * @param {string} message
     */
    static notifyNow(action: string, code: number, message: string): void;
    Action: string;
    Code: TransactionCode;
    Data?: T;
    Message: string;
    /**
     * Load configurations and create Transaction Object
     * @constructor
     * @param {any} opt - Payload Data
     */
    constructor(data?: T);
    /**
     * Toggle remarkable-bootstrap-notify
     */
    $noify(): void;
    /**
     * Export Vue.js model function
     */
    $toVue(): () => Transaction<T>;
    /**
     * Export as JSON
     */
    $toJson(): string;
}
