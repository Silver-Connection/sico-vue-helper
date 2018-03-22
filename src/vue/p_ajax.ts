import _Vue from "vue";
import { CommonHelper, CommonHelperAjaxOptions, CommonHelperFindCallback } from "../common/lib";
import { pathArrayConvert } from "./p_path";

export default function install(Vue: typeof _Vue, options?: any): void {
    /**
     * Send a GET request to given URL
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    Vue.prototype.$ajaxGet = function (options: CommonHelperAjaxOptions | string): void {
        if (options == undefined) {
            return;
        }

        const valid = ajaxOptionsValidate(options);
        ajax(
            {
                contentType: "application/json",
                dataType: "json",
                method: "GET",
                url: valid.url,
            },
            valid,
            this);
    };

    /**
     * Send a POST request to given URL
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    Vue.prototype.$ajaxPost = function (options: CommonHelperAjaxOptions | string): void {
        if (options == undefined) {
            return;
        }

        const valid = ajaxOptionsValidate(options);
        ajax(
            {
                contentType: "application/json",
                data: JSON.stringify(this.$path(valid.path)),
                dataType: "json",
                method: "POST",
                url: valid.url,
            },
            valid,
            this);
    };

    /**
     * Send a PUT request to given URL
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    Vue.prototype.$ajaxPut = function (options: CommonHelperAjaxOptions | string): void {
        if (options == undefined) {
            return;
        }

        const valid = ajaxOptionsValidate(options);
        ajax(
            {
                contentType: "application/json",
                data: JSON.stringify(this.$path(valid.path)),
                dataType: "json",
                method: "PUT",
                url: valid.url,
            },
            valid,
            this);
    };

    /**
     * Send a DELETE request to given URL
     * @param {CommonHelperAjaxOptions} options - Request options
     */
    Vue.prototype.$ajaxDelete = function (options: CommonHelperAjaxOptions | string): void {
        if (options == undefined) {
            return;
        }

        const valid = ajaxOptionsValidate(options);
        valid.setData = false;
        ajax(
            {
                contentType: "application/json",
                dataType: "json",
                method: "DELETE",
                url: valid.url,
            },
            valid,
            this);
    };
}

function ajaxOptionsValidate(options: CommonHelperAjaxOptions | string): CommonHelperAjaxOptions {
    if (options === undefined) {
        throw new TypeError("VueHelper ajax options are not set!");
    }

    if (typeof options === "string" || options instanceof String) {
        const valid = $.extend(true, {}, CommonHelper.defaultAjax);
        valid.url = options.toString();

        return valid;
    }

    const valid = $.extend(true, {}, CommonHelper.defaultAjax, options);
    if (valid.url === undefined) {
        throw new TypeError("VueHelper ajax URL not set!");
    }

    if (valid.action == "hide") {
        valid.setNotify = false;
    }

    return valid;
}

function ajax(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions, vue: _Vue) {
    CommonHelper.ajaxBase(settings, options, (response) => {
        if (vue != undefined) {
            vue.$set(vue, "Action", response.Action);
            vue.$set(vue, "Code", response.Code);
            vue.$set(vue, "Message", response.Message);
            if (options.setData && response.Code < 2) {
                // Get path
                if (options.path == undefined || options.path === "" || options.path === "undefined") {
                    vue.$set(vue, "Data", response.Data);
                } else {
                    const pointer = pathSplitLastLevel(options.path);
                    if (pointer !== undefined) {
                        // console.log(pointer);
                        const partial = vue.$path(pointer.base);
                        vue.$set(partial, pointer.name, response.Data);
                    }
                    // const cmd = "vue.$data." + options.path + " = response.Data;";
                    // // tslint:disable-next-line:no-eval
                    // eval(cmd);
                }
            }
        }
    });
}

function pathSplitLastLevel(path: string) {
    if (path.indexOf(".") > -1) {
        const paths = path.split(".");
        let base = "";
        let name = "";
        for (let i = 0; i < paths.length; i++) {
            if (i === paths.length - 1) {
                const arrayConvert = pathArrayConvert(paths[i]);
                if (arrayConvert !== undefined) {
                    base += "." + arrayConvert.base;
                    name = arrayConvert.index;
                } else {
                    name = paths[i];
                }
            } else {
                base += "." + paths[i];
            }
        }

        return { base: base.substr(1), name };
    }

    return undefined;
}