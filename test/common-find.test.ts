import { } from "jest";
import { Common } from "../src/main";

describe("CommonHelper - find", () => {
    it("find: no-match", () => {
        const ary = [{ id: 1}, { id: 2}, { id: 3}, { id: 4}];
        const test = Common.find(ary, (item, index) => {
            return item.id === 18;
        });

        expect(test).toEqual(undefined);
    });

    it("find: match single", () => {
        const ary = ["a", "b", "c", "d"];
        let i = 0;
        const test = Common.find(ary, (item, index) => {
            i = index;
            return item === "c";
        });

        expect(test).toBe("c");
        expect(i).toBe(2);
    });

    it("find: match single model", () => {
        const ary = [{ id: 1}, { id: 2}, { id: 3}, { id: 4}];
        let i = 0;
        const test = Common.find(ary, (item, index) => {
            i = index;
            return item.id === 3;
        });

        expect(test).toEqual({ id: 3});
        expect(i).toBe(2);
    });

    it("find: match multi, match first only", () => {
        const ary = ["a", "b", "c", "c"];
        let i = 0;
        const test = Common.find(ary, (item, index) => {
            i = index;
            return item === "c";
        });

        expect(test).toBe("c");
        expect(i).toBe(2);
    });

    it("find: empty source list", () => {
        let i = 0;
        const test = Common.find([], (item, index) => {
            i = index;
            return item.id === 3;
        });

        expect(test).toEqual(undefined);
        expect(i).toBe(0);
    });

    it("find: undefined source list", () => {
        let i = 0;
        const test = Common.find(undefined, (item, index) => {
            i = index;
            return item.id === 3;
        });

        expect(test).toEqual(undefined);
        expect(i).toBe(0);
    });

    it("find: undefined filter function", () => {
        const t = () => Common.find([], undefined);
        expect(t).toThrow(TypeError);
    });
});
