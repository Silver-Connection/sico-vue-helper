import { } from "jest";
import { TransactionCode, TransactionModel, Transaction } from "../src/transaction/lib";

describe("transaction", () => {
    it("transaction: isTransaction", () => {
        const t1 = new Transaction("Model");
        expect(Transaction.isTransaction(t1)).toBeTruthy();
        expect(Transaction.isTransaction(t1.$toJson())).toBeFalsy();

        const t2 = {
            Action: "Load",
            Code: 1,
            Data: "Model",
            Message: "All data loaded"
        };
        expect(Transaction.isTransaction(t2)).toBeTruthy();

        const t3 = {
            Code: 1,
            Data: "Model",
            Message: "All data loaded"
        };
        expect(Transaction.isTransaction(t3)).toBeFalsy();

        const t4 = {
            Action: "Load",
            Data: "Model",
            Message: "All data loaded"
        };
        expect(Transaction.isTransaction(t4)).toBeFalsy();

        const t5 = {
            Action: "Load",
            Code: 1,
            Message: "All data loaded"
        };
        expect(Transaction.isTransaction(t5)).toBeFalsy();

        const t6 = {
            Action: "Load",
            Code: 1,
            Data: "Model",
        };
        expect(Transaction.isTransaction(t6)).toBeFalsy();

        expect(Transaction.isTransaction(undefined)).toBeFalsy();
        expect(Transaction.isTransaction(2)).toBeFalsy();
    });
});
