export function responseSuccess(model) {
    const d = $.Deferred();
    d.resolve(model);
    return d.promise();
}

export function responseError() {
    const d = $.Deferred();
    d.reject({}, {}, "Connection timed out!");
    return d.promise();
}