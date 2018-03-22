import { } from "jest";
import jsdom from "jsdom";
import sinon from "sinon";
import Vue from "vue";
import { Common, Transaction } from "../src/main";
import { responseSuccess, responseError } from "./ajax-setup";

interface IUser {
    Id: number;
    Name: string;
}

const ajaxStub = sinon.stub($, "ajax");
const respondGet = new Transaction<IUser>({
    Id: 1,
    Name: "User-1"
});

describe("CommonHelper - ajax", () => {
    it("ajax: simple request", () => {
        ajaxStub.returns(responseSuccess(respondGet));
        const callback = (responde: Transaction<IUser>) => {
            expect(responde.Data.Id).toBe(1);
            expect(responde.Data.Name).toBe("User-1");
        };
        const callbackSpy = sinon.spy(callback);

        Common.ajax({
            contentType: "application/json",
            dataType: "json",
            method: "GET",
            url: "/get",
        },
            {
                setNotify: false,
                callback: callbackSpy
            });

        expect(callbackSpy.calledOnce).toBeTruthy();
        ajaxStub.restore();
    });

    it("ajax: failed request", () => {
        ajaxStub.returns(responseError);
        const callback = (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus, errorThrown: string) => {
            expect(textStatus).toBe("error");
        };
        const callbackSpy = sinon.spy(callback);

        Common.ajax({
            contentType: "application/json",
            dataType: "json",
            method: "GET",
            url: "/get",
        },
            {
                setNotify: false,
                callbackError: callbackSpy
            });

        expect(callbackSpy.calledOnce).toBeTruthy();
        ajaxStub.restore();
    });
});
