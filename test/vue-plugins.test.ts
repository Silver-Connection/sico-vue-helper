import { } from "jest";
import Vue from "vue";
import { vueModel } from "./vue-setup";

describe("vue-plugins", () => {
    it("$path: loaded", () => {
        expect(typeof vueModel.$path).toBe("function");
    });
    it("$find: loaded", () => {
        expect(typeof vueModel.$find).toBe("function");
    });
    it("$ajaxGet: loaded", () => {
        expect(typeof vueModel.$ajaxGet).toBe("function");
    });
    it("$ajaxPost: loaded", () => {
        expect(typeof vueModel.$ajaxPost).toBe("function");
    });
    it("$ajaxPut: loaded", () => {
        expect(typeof vueModel.$ajaxPut).toBe("function");
    });
    it("$ajaxDelete: loaded", () => {
        expect(typeof vueModel.$ajaxDelete).toBe("function");
    });
});
