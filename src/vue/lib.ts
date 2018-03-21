import _Vue from "vue";
import * as p_path from "./p_path";
import * as p_find from "./p_find";
import * as p_ajax from "./p_ajax";

export class VueHelper {
    public static install(Vue: typeof _Vue, options?: any): void {
        p_path.default(Vue, options);
        p_find.default(Vue, options);
        p_ajax.default(Vue, options);
    }
}