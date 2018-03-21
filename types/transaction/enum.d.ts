export declare enum TransactionCode {
    /**
     * No Action to take
     */
    NoAction = 0,
    /**
     * Transaction was successful
     */
    Success = 1,
    /**
     * Transaction returned an error
     */
    Error = 2,
    /**
     * Transaction canceled by user
     */
    Canceled = 3,
    /**
     * Access Denied
     */
    AccessDenied = 11,
}
