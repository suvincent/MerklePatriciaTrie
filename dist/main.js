"use strict";
exports.__esModule = true;
var MPT_1 = require("./MPT");
var more_testcase_1 = require("./more_testcase");
var tree = new MPT_1.MerklePatriciaTrie();
var p = more_testcase_1.testcase6;
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        tree.AddNode(key, p[key]);
    }
}
tree.AddNode('a711356', '46');
tree.UpdateValue('a711356', '460');
tree.print();
tree.list();
