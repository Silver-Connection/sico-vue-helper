import { } from "jest";
import Vue from "vue";
import sinon from "sinon";
import { vueModel, vueTransaction } from "./vue-setup";
import { responseSuccess, responseError } from "./ajax-setup";

const ajaxStub = sinon.stub($, "ajax");

describe("vue-ajax", () => {
    it("$ajaxGet: update model with path", () => {
        const responseModel = {
            Name: "User-2",
            Mail: "user-2@domain.com",
            Id: 2
        };

        ajaxStub.returns(responseSuccess(responseModel));
        vueTransaction.$ajaxGet({
            url: "/get",
            path: "Data.User",
            setNotify: false
        });

        expect(vueTransaction.Data.User.Id).toBe(2);
        expect(vueTransaction.Data.User.Name).toBe("User-2");
        expect(vueTransaction.Data.User.Mail).toBe("user-2@domain.com");
    });

    it("$ajaxGet: update array item", () => {
        const responseModel = {
            Name: "User-2",
            Id: 99
        };

        ajaxStub.returns(responseSuccess(responseModel));
        vueTransaction.$ajaxGet({
            url: "/get",
            path: "Data.List[2]",
            setNotify: false
        });

        expect(vueTransaction.Data.List[2].Id).toBe(99);
        expect(vueTransaction.Data.List[2].Name).toBe("User-2");
    });
});
