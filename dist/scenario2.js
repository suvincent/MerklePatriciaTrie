"use strict";
exports.__esModule = true;
var MPT_1 = require("./MPT");
var testcase = { '7c3002ad756d76a643cb09cd45409608abb642d9': '10',
    '7c303333756d555643cb09cd45409608abb642d9': '20',
    '7c303333756d777643cb09c999409608abb642d9': '30',
    '7c303333756d777643cb09caaa409608abb642d9': '40',
    '111102ad756d76a643cb09cd45409608abb642d9': '50' };
var Update = {
    '7c3002ad756d76a643cb09cd45409608abb642d9': '8',
    '7c303333756d777643cb09c999409608abb642d9': '24',
    '7c303333756d777643cb09caaa409608abb642d9': '42'
};
var InsertNew = { '11113333756d76a643cb09cd45409608abb642d9': '6' };
var tree = new MPT_1.MerklePatriciaTrie();
var p = testcase;
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        tree.AddNode(key, p[key]);
    }
}
var q = Update;
for (var key in q) {
    if (q.hasOwnProperty(key)) {
        tree.UpdateValue(key, q[key]);
    }
}
var r = InsertNew;
for (var key in r) {
    if (r.hasOwnProperty(key)) {
        tree.AddNode(key, r[key]);
    }
}
tree.print();
tree.list();
