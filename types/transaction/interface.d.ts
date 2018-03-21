import { TransactionCode } from "./enum";
export interface TransactionModel {
    /**
     * Transaction action name
     * @default null
     * @type string
     */
    Action: string;
    /**
     * Transaction return code
     * @default null
     * @type string
     */
    Code: TransactionCode;
    /**
     * Actual data
     * @default null
     * @type string
     */
    Data?: any;
    /**
     * Transaction message
     * @default null
     * @type string
     */
    Message: string;
}
