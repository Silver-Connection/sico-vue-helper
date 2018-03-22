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
                    const arrayConvert = pathArrayConvert(paths[i]);
                    if (arrayConvert !== undefined) {
                        list = list[arrayConvert.base][arrayConvert.index];
                    } else {
                        list = list[t];
                    }
                }
            }
        } else {
            const arrayConvert = pathArrayConvert(path);
            if (arrayConvert !== undefined) {
                list = this.$data[arrayConvert.base][arrayConvert.index];
            }
        }

        return list;
    };
}

export function pathArrayConvert(path: string) {
    const startPos = path.indexOf("[");
    if (startPos > -1) {
        const index = path.substr(startPos + 1).replace("]", "");
        return {
            base: path.substr(0, startPos),
            index: path.substr(startPos + 1).replace("]", ""),
        };
    }

    return undefined;
}