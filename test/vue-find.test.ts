import { } from "jest";
import Vue from "vue";
import { vueModel } from "./vue-setup";

describe("vue-find", () => {
    it("$find: match object list", () => {
        const test = vueModel.$find("List", (item, index) => {
            return item.Id === 4;
        });

        expect(test.Id).toBe(4);
        expect(test.Name).toBe("D");
    });

    it("$find: wrong path", () => {
        const test = vueModel.$find("ListA", (item, index) => {
            return item.Id === 4;
        });

        expect(test).toBe(undefined);
    });
});
