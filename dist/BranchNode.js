"use strict";
exports.__esModule = true;
exports.BranchNode = void 0;
var LeafNode_1 = require("./LeafNode");
var ExtensionNode_1 = require("./ExtensionNode");
var Common_1 = require("./Common");
var BranchNode = (function () {
    function BranchNode() {
        this.HexArray = new Array(16);
    }
    BranchNode.prototype.Addnode = function (k, v) {
        if (k == "") {
            this.value = v;
            return;
        }
        var index = parseInt("0x" + k[0]);
        if (this.HexArray[index]) {
            if (this.HexArray[index].constructor.name == LeafNode_1.LeafNode.name) {
                var Leaf = this.HexArray[index];
                var subaddress = Common_1.longest(Leaf.keyEnd, k.substring(1, k.length));
                var tempExtension = new ExtensionNode_1.ExtensionNode(subaddress);
                tempExtension.Addnode(k.substring(1, k.length), v);
                tempExtension.Addnode(Leaf.keyEnd, Leaf.value);
                this.HexArray[index] = tempExtension;
            }
            else if (this.HexArray[index].constructor.name == ExtensionNode_1.ExtensionNode.name) {
                this.HexArray[index].Addnode(k.substring(1, k.length), v);
            }
        }
        else {
            this.HexArray[index] = new LeafNode_1.LeafNode();
            this.HexArray[index].Addnode(k.substring(1, k.length), v);
        }
        this.hash = this.hashself();
        return this.hash;
    };
    BranchNode.prototype.print = function (LEVEL) {
        var space = "";
        for (var i = 0; i < LEVEL; i++) {
            space += "    ";
        }
        console.log(space, "Branch : ");
        for (var index = 0; index < 16; index++) {
            if (this.HexArray[index]) {
                console.log(space, index);
                this.HexArray[index].print(LEVEL + 1);
            }
        }
    };
    BranchNode.prototype.list = function (flag) {
        var arr = [];
        for (var index = 0; index < 16; index++) {
            if (this.HexArray[index]) {
                arr[index] = this.HexArray[index].list(flag);
            }
            else {
            }
        }
        arr[16] = this.value;
        return arr;
    };
    BranchNode.prototype.hashself = function () {
        var arr = [];
        for (var index = 0; index < 16; index++) {
            if (this.HexArray[index]) {
                arr[index] = this.HexArray[index].hashself();
            }
            else {
                arr[index] = Buffer.from('');
            }
        }
        if (this.value)
            arr[16] = this.value;
        else
            arr[16] = Buffer.from('');
        return Common_1.SHARLP(arr);
    };
    BranchNode.prototype.checkExist = function (address) {
        var key = parseInt("0x" + address[0]);
        if (this.HexArray[key]) {
            return this.HexArray[key].checkExist(address.substring(1, address.length));
        }
        else {
            return false;
        }
    };
    BranchNode.prototype.UpdateValue = function (address, value) {
        var key = parseInt("0x" + address[0]);
        if (this.HexArray[key]) {
            return this.HexArray[key].UpdateValue(address.substring(1, address.length), value);
        }
        else {
            return false;
        }
    };
    return BranchNode;
}());
exports.BranchNode = BranchNode;
