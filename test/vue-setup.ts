import Vue from "vue";
import { VueHelper } from "../src/vue/lib";
import { Transaction } from "../src/transaction/lib";

// Init
document.body.innerHTML = '<div id="a"></div><div id="b"></div>';
Vue.use(VueHelper);

// Sample data
export const modelRaw = {
    Id: 10,
    Name: "Test",
    Score: 14,
    User: {
        Name: "User-1",
        Mail: "user-1@domain.com",
        Id: 1
    },
    Nest: {
        Name: "A",
        Child: {
            Name: "A",
            Id: 1
        }
    },
    List: [
        { Id: 1, Name: "A"},
        { Id: 2, Name: "B"},
        { Id: 3, Name: "C"},
        { Id: 4, Name: "D"},
        { Id: 5, Name: "E"},
    ]
};

export const modelFunction = () => modelRaw;

export const modelTransaction = new Transaction(modelRaw);

export const vueModel = new Vue({
    // el: "#a",
    data: modelFunction
});

export const vueTransaction = new Vue({
    // el: "#b",
    data: modelTransaction.$toVue()
});