Vue Plugins
---
<!-- TOC -->

- [$path](#path)
    - [Usage](#usage)
- [$find](#find)
    - [Usage](#usage-1)
- [$ajax](#ajax)
- [Usage](#usage-2)
- [API](#api)

<!-- /TOC -->

Plugin for making Ajax request and update Vue ViewModel on success.

## $path

Get part of the ViewModel, for partial updates. 

### Usage

```javascript
var model = 
{
    Id: 1,
    A: {
        Id: 2,
        B: {
            Id: 3,
            C: ["a", "b", "c"]
        }
    }
};
var vueModel = new Vue(
    el: "#id",
    date: function () { return model },
);

var partial = vueModel.$path("A");
// Will return 
A: {
    Id: 2,
    B: {
        Id: 3,
        C: ["a", "b", "c"]
    }
}

var partial = vueModel.$path("A.B");
// Will return 
B: {
    Id: 3,
    C: ["a", "b", "c"]
}

var partial = vueModel.$path("A.B.C[1]");
// Will return 
b

```

## $find

Find item in array

### Usage

```javascript
var partial = vueModel.$find("A.B.C", function(item, index){
    return item === "c"
});
// Will return 
c

```

## $ajax

We have 4 shortcuts:

* $ajaxGet
* $ajaxPost
* $ajaxPut
* $ajaxDelete

> Note for $ajaxDelete
>
> This method never will set / remove any data from your model
> You have to take care your self, in the callback functions

## Usage

```javascript
vueModel.$ajaxGet({..});
vueModel.$ajaxGet("A.B");
vueModel.$ajaxGet("A.B.C[1]");
```

## API

**Instance Methods**

| Method | Return | Description |
|---|---|---|
|$path(path: string)| Partial Model | Get a part of the ViewModel |
|$find(listOrPath: string | any[], callback: CommonHelperFindCallback)| array item | Finds an item in a array |
|$ajaxGet(options?: CommonHelperAjaxOptions)| void | Send a GET request |
|$ajaxPost(options?: CommonHelperAjaxOptions)| void | Send a POST request |
|$ajaxPut(options?: CommonHelperAjaxOptions)| void | Send a PUT request |
|$ajaxDelete(options?: CommonHelperAjaxOptions)| void | Send a DELETE request |

**Callbacks**

| Type Name | Signature |
|---|---|
|CommonHelperFindCallback| (el: any, index?: number) => boolean |
|CommonHelperAjaxCallback| (data?: any) => void |
|CommonHelperAjaxErrorCallback| (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus, errorThrown: string) => void |