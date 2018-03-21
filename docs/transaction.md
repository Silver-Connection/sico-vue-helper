Transactions
---
<!-- TOC -->

- [Transaction Model](#transaction-model)
- [Transaction Codes](#transaction-codes)
- [Usage](#usage)
- [API](#api)

<!-- /TOC -->


The ```TransactionModel``` is a wrapper interface for your ViewModel. This is useful, when you work with Ajax requests.

## Transaction Model

The structure of the ```TransactionModel``` interface is as follows.

```typescript
export interface TransactionModel {
    /**
     * Transaction action name
     * @default null
     * @type string
     */
    Action: string,

    /**
     * Transaction return code
     * @default null
     * @type string
     */
    Code: TransactionCode | number,

    /**
     * Actual data
     * @default null
     * @type string
     */
    Data: any,

    /**
     * Transaction message
     * @default null
     * @type string
     */
    Message: string
}
```

You can also use the class ```Transaction``` which implements the interface and gives you some methods for notifications.

## Transaction Codes

The ```TransactionCode``` Enums is used to the set the transaction status. Based on the ```TransactionCode``` the type of the notification displayed changes.

You can change the styles when setting when overwriting this settings.

```typescript
// For details visit http://bootstrap-notify.remabledesigns.com/
Transaction.NOTIFY_INFO = {}; // If TransactionCode = 0
Transaction.NOTIFY_SUCCESS = {}; // If TransactionCode = 1
Transaction.NOTIFY_ERROR = {}; // If TransactionCode > 1
```

```typescript
export enum TransactionCode {
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
```

## Usage

```javascript
// Notifications
sico.Transaction.notifyNow("Info", 0, "Some informations...");
sico.Transaction.notifyNow("Success", 1, "All done!");
sico.Transaction.notifyNow("Error", 2, "Ohn...we have erros");

// ViewModel
const viewModel = { 
    Id: 1,
    Name: "Sample",
    Points: 100,
};

const transactionModel = new sico.Transaction(viewModel);
if (sico.Transaction.isTransaction(transactionModel)) {
    transactionModel.$notify();
    // or
    sico.Transaction.notify(transactionModel);
}
```

## API

**Static Methods**

| Method | Return | Description |
|---|---|---|
|isTransaction(data: any)| boolean | Check if given object matches TransactionModel interface |
|notify(model: TransactionModel)| void | Generate notification based on TransactionModel |
|notifyNow(action: string, code: number, message: string)| void | Generate notification. |

**Instance Methods**

| Method | Return | Description |
|---|---|---|
|$notify()| void | Generate notification based on Transaction class |
|$toVue()| () => any | Wraps data in a function for use with Vue.js |
|$toJson()| string | Generates JSON string |