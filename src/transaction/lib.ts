import { TransactionCode } from "./enum";
import { TransactionModel } from "./interface";

export { TransactionCode } from "./enum";
export { TransactionModel } from "./interface";

export class Transaction<T> implements TransactionModel {
    public static NOTIFY_INFO = {
        delay: 5000,
        icon_type: "class",
        type: "info",
    };
    public static NOTIFY_SUCCESS = {
        delay: 5000,
        icon_type: "class",
        type: "success",
    };
    public static NOTIFY_ERROR = {
        delay: 5000,
        icon_type: "class",
        type: "danger",
    };

    /**
     * Check if model implements TransactionModel
     * @param {TransactionModel} model - Transaction Model
     */
    public static isTransaction(model: any): model is TransactionModel {
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
    }

    /**
     * Toggle remarkable-bootstrap-notify
     * @param {any} model - Transaction Model
     */
    public static notify(model: any): void {
        if (Transaction.isTransaction(model)) {
            Transaction.notifyNow(model.Action, model.Code, model.Message);
        }
    }

    /**
     * Toggle remarkable-bootstrap-notify
     * @param {string} action
     * @param {Transaction Code | number} code
     * @param {string} message
     */
    public static notifyNow(action: string, code: number, message: string): void {
        switch (code) {
            case 0:
                $.notify({
                    icon: "fa fa-ellipsis-h",
                    message,
                    title: "<strong>" + (action === "" ? "Init" : action) + "</strong><br/>",
                }, Transaction.NOTIFY_INFO);
                break;
            case 1:
                $.notify({
                    icon: "fa fa-floppy-o",
                    message,
                    title: "<strong>" + action + "</strong><br/>",
                }, Transaction.NOTIFY_SUCCESS);
                break;

            default:
                $.notify({
                    icon: "fa fa-exclamation",
                    message,
                    title: "<strong>" + (action === "" ? "Error" : action) + "</strong><br/>",
                }, Transaction.NOTIFY_ERROR);

                break;
        }
    }

    public Action: string;
    public Code: TransactionCode;
    public Data?: T;
    public Message: string;

    /**
     * Load configurations and create Transaction Object
     * @constructor
     * @param {any} opt - Payload Data
     */
    public constructor(data?: T) {
        this.Action = "";
        this.Code = 0;
        this.Data = data == undefined ? undefined : data;
        this.Message = "";
    }

    /**
     * Toggle remarkable-bootstrap-notify
     */
    public $noify(): void {
        Transaction.notifyNow(this.Action, this.Code, this.Message);
    }

    /**
     * Export Vue.js model function
     */
    public $toVue(): () => Transaction<T> {
        const $this = this;
        return () => $this;
    }

    /**
     * Export as JSON
     */
    public $toJson(): string {
        return JSON.stringify(this);
    }
}