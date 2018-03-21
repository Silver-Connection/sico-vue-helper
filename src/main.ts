import { CommonHelperFindCallback, CommonHelperAjaxCallback, CommonHelperAjaxErrorCallback, CommonHelperAjaxOptions } from "./common/lib";

declare module "vue/types/vue" {
    interface Vue {
        $path(path?: string): any;
        $find(path: string | any[], callback: CommonHelperFindCallback): any;
        $ajaxGet(options: CommonHelperAjaxOptions | string): void;
        $ajaxPost(options: CommonHelperAjaxOptions | string): void;
        $ajaxPut(options: CommonHelperAjaxOptions | string): void;
        $ajaxDelete(options: CommonHelperAjaxOptions | string): void;
    }
}

export { TransactionModel } from "./transaction/lib";
export { CommonHelperFindCallback, CommonHelperAjaxCallback, CommonHelperAjaxErrorCallback, CommonHelperAjaxOptions } from "./common/lib";

export { TransactionCode, Transaction } from "./transaction/lib";
export { CommonHelper as Common } from "./common/lib";
export { VueHelper as VuePlugins } from "./vue/lib";
