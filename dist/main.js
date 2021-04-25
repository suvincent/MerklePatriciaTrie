"use strict";
exports.__esModule = true;
var MPT_1 = require("./MPT");
var more_testcase_1 = require("./more_testcase");
var tree = new MPT_1.MerklePatriciaTrie();
var p = more_testcase_1.testcase5;
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        tree.AddNode(key, p[key]);
    }
}
tree.print();
tree.list();
