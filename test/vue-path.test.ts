import { } from "jest";
import Vue from "vue";
import { vueModel } from "./vue-setup";

describe("vue-path", () => {
    it("$path: match object", () => {
        const test = vueModel.$path("User");

        expect(test.Name).toBe("User-1");
        expect(test.Mail).toBe("user-1@domain.com");
        expect(test.Id).toBe(1);
    });

    it("$path: match nested object", () => {
        const test = vueModel.$path("Nest.Child");

        expect(test.Name).toBe("A");
        expect(test.Id).toBe(1);
    });

    it("$path: match array", () => {
        const test = vueModel.$path("List");

        expect(test.length).toBe(5);
        expect(test[0].Name).toBe("A");
        expect(test[0].Id).toBe(1);
    });
});
