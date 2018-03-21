import _Vue from "vue";

export default function install(Vue: typeof _Vue, options?: any): void {
    /**
     * Get Value from given Path
     * @param {String} path to data
     */
    Vue.prototype.$path = function (path?: string): any {
        if ((path === undefined || path === "" || path === "undefined")) {
            return this.$data;
        }

        let list = this.$data[path];
        if (path.indexOf(".") > -1) {
            const paths = path.split(".");
            for (let i = 0; i < paths.length; i++) {
                if (i === 0) {
                    list = this.$data[paths[i]];
                } else {
                    const t = paths[i];
                    if (t.indexOf("[") > -1) {
                        const index = t.substr(t.indexOf("[") + 1).replace("]", "");
                        const base = t.substr(0, t.indexOf("["));
                        list = list[base][index];
                    } else {
                        list = list[paths[i]];
                    }
                }
            }
        }

        return list;
    };
}