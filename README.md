sico-vue-helpers
===

<!-- TOC -->

- [Installation](#installation)
- [Transaction](#transaction)
- [Common](#common)
- [Vue-Plugins](#vue-plugins)

<!-- /TOC -->

This a set of tools for work with [Vue.js](https://vuejs.org/) and Ajax requests. Request are handled with [jQuery](http://jquery.com/) and notifications are displayed using [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/). 

## Installation

In order to get this running we need some other libraries.

* [jQuery](http://jquery.com/)
* [Vue.js](https://vuejs.org/)
* [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/) (optional)

```html
<!-- Helper -->
<script type="text/javascript" src="node_modules/sico-vue-helper/dist/sico.vue-helpers.umd.js"></script>
```

You also need to register the plugins to Vue

```javascript
// ES5+
import { Common, VuePlugins, Transaction } from "sico-vue-helper";
import Vue from "vue";

Vue.use(VuePlugins);

// UMD
Vue.use(sico.VuePlugins);
```

## Transaction

> **Documentation**
>
> [Read](https://github.com/Silver-Connection/sico-vue-helpers/blob/master/docs/transaction.md)

## Common

> **Documentation**
>
> [Read](https://github.com/Silver-Connection/sico-vue-helpers/blob/master/docs/common.md)

## Vue-Plugins

> **Documentation**
>
> [Read](https://github.com/Silver-Connection/sico-vue-helpers/blob/master/docs/vue-plugins.md)
