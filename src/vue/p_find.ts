import _Vue from "vue";
import { CommonHelper, CommonHelperFindCallback } from "../common/lib";

export default function install(Vue: typeof _Vue, options?: any): void {
    /**
     * Find polyfill
     * @param {String | Array} path to data or array
     * @param {Function} callback callback function used for search
     */
    Vue.prototype.$find = function (path: string | any[], callback: CommonHelperFindCallback): any {
        let list = undefined;
        if (path && path.constructor === Array) {
            list = path;
        }

        if (typeof path === "string" || path instanceof String) {
            list = this._getValue(path.toString());
        }

        if (list === undefined) {
            return undefined;
        }

        return CommonHelper.find(list, callback);
    };
}