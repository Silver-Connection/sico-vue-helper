import { } from "jest";
import jsdom from "jsdom";
import sinon from "sinon";
import Vue from "vue";
import { Common, Transaction } from "../src/main";

function okResponse(model) {
    const d = $.Deferred();
    d.resolve(model);
    return d.promise();
}

function errorResponse() {
    const d = $.Deferred();
    d.reject({}, {}, "could not complete");
    return d.promise();
}

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
        ajaxStub.returns(okResponse(respondGet));

        Common.ajax({
            contentType: "application/json",
            dataType: "json",
            method: "GET",
            url: "/get",
        },
            {
                setNotify: false,
                callback: (responde: Transaction<IUser>) => {
                    expect(responde.Data.Id).toBe(1);
                    expect(responde.Data.Name).toBe("User-1");
                    // console.log(responde);
                }
            });

        ajaxStub.restore();
    });
});
