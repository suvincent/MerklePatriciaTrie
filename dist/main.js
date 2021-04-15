"use strict";
exports.__esModule = true;
var MPT_1 = require("./MPT");
var tree = new MPT_1.MerklePatriciaTrie();
tree.AddNode("a711355", 10);
tree.AddNode("a7f9365", 20);
tree.AddNode("a77d337", 40);
tree.AddNode("a77d397", 50);
tree.print();
function longest(a, b) {
    var sub = "";
    for (var i = 0; i < a.length; i++) {
        if (a[i] == b[i]) {
            sub += a[i];
        }
        else {
            break;
        }
    }
    console.log(sub);
}
