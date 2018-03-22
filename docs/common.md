Common Helper
---
<!-- TOC -->

- [Find](#find)
    - [Usage](#usage)
- [Ajax](#ajax)
    - [Options](#options)
    - [Usage](#usage-1)
- [API](#api)

<!-- /TOC -->

The ```Common``` is a set of tools used by the Vue plugins.

## Find

Find item in array.

### Usage

```javascript
const ary = ["a", "b", "c", "d"];
sico.Common.find(ary, (item, index) => {
    return item === "c";
});
```

## Ajax

Wrapper for jQuery Ajax 

### Options

```typescript
export interface CommonHelperAjaxOptions {
    /**
     * Ajax URL
     * @default null
     * @type string
     */
    url?: string;

    /**
     * Overwrite tarnsaction action string
     * @default null
     * @type string
     */
    action?: string;

    /**
     * Overwrite tarnsaction message
     * @default null
     * @type string
     */
    message?: string;

    /**
     * Path in Vue model for sending and receivng
     * @default null
     * @type string
     */
    path?: string;

    /**
     * Callback function success
     * @default null
     * @type string
     */
    callback?: CommonHelperAjaxCallback;

    /**
     * Callback function fail
     * @default null
     * @type string
     */
    callbackError?: CommonHelperAjaxErrorCallback;

    /**
     * Update model on success
     * @default null
     * @type string
     */
    setData?: boolean;

    /**
     * Display transaction on success
     * @default null
     * @type string
     */
    setNotify?: boolean;
}
```

### Usage

```javascript
sico.Common.ajax(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions);
```

## API

| Method | Return | Description |
|---|---|---|
|ajax(settings: JQueryAjaxSettings, options: CommonHelperAjaxOptions)| void | Send a Ajax request |
|find(list: any[], callback: CommonHelperFindCallback)| array item | Find item in array |

**Callbacks**

| Type Name | Signature |
|---|---|
|CommonHelperFindCallback| (el: any, index?: number) => boolean |
|CommonHelperAjaxCallback| (data?: any) => void |
|CommonHelperAjaxErrorCallback| (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus, errorThrown: string) => void |