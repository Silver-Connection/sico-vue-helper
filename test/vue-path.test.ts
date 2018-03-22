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

        expect(test.Name).toBe("Level-2");
        expect(test.Id).toBe(1);
    });

    it("$path: match array", () => {
        const test = vueModel.$path("List");

        expect(test.length).toBe(5);
        expect(test[0].Name).toBe("A");
        expect(test[0].Id).toBe(1);
    });

    it("$path: match array element", () => {
        const test = vueModel.$path("List[0]");

        expect(test.Name).toBe("A");
        expect(test.Id).toBe(1);
    });

    it("$path: match root", () => {
        let test = vueModel.$path("");
        expect(test.Id).toBe(10);
        expect(test.Name).toBe("Test");
        expect(test.Score).toBe(14);

        test = vueModel.$path(undefined);
        expect(test.Id).toBe(10);
        expect(test.Name).toBe("Test");
        expect(test.Score).toBe(14);

        test = vueModel.$path("undefined");
        expect(test.Id).toBe(10);
        expect(test.Name).toBe("Test");
        expect(test.Score).toBe(14);

        test = vueModel.$path();
        expect(test.Id).toBe(10);
        expect(test.Name).toBe("Test");
        expect(test.Score).toBe(14);
    });

    it("$path: match not found", () => {
        const test = vueModel.$path("NotFound");
        expect(test).toBe(undefined);
    });

    it("$path: match nested not found", () => {
        const test = vueModel.$path("Nest.Children");
        expect(test).toBe(undefined);
    });
});
