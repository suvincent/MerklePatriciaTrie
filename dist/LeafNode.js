"use strict";
exports.__esModule = true;
exports.LeafNode = void 0;
var Common_1 = require("./Common");
var LeafNode = (function () {
    function LeafNode() {
    }
    LeafNode.prototype.Addnode = function (k, v) {
        if (k.length % 2 == 0) {
            this.prefix = 2;
        }
        else {
            this.prefix = 3;
        }
        this.keyEnd = k;
        this.changeValue(v);
        return this.hash;
    };
    LeafNode.prototype.changeValue = function (new_value) {
        this.value = new_value;
        this.hash = this.hashself();
    };
    LeafNode.prototype.changeKeyend = function (new_key) {
        this.keyEnd = new_key;
        this.hash = this.hashself();
    };
    LeafNode.prototype.hashself = function () {
        if (this.prefix == 2) {
            return Common_1.SHARLP([Buffer.from("20" + this.keyEnd, "hex"), this.value]);
        }
        else if (this.prefix == 3) {
            return Common_1.SHARLP([Buffer.from("3" + this.keyEnd, "hex"), this.value]);
        }
    };
    LeafNode.prototype.print = function (LEVEL) {
        var space = "";
        for (var i = 0; i < LEVEL; i++) {
            space += "    ";
        }
        if (this.prefix == 2)
            console.log(space, "LEAF : ", ["20" + this.keyEnd, this.value]);
        else if (this.prefix == 3)
            console.log(space, "LEAF : ", ["3" + this.keyEnd, this.value]);
    };
    LeafNode.prototype.list = function (flag) {
        if (flag) {
            if (this.prefix == 2)
                return [parseInt("0x20" + this.keyEnd), this.value];
            else if (this.prefix == 3)
                return [parseInt("0x3" + this.keyEnd), this.value];
        }
        else {
            if (this.prefix == 2)
                return ["20" + this.keyEnd, this.value];
            else if (this.prefix == 3)
                return ["3" + this.keyEnd, this.value];
        }
    };
    LeafNode.prototype.checkExist = function (address) {
        if (address == this.keyEnd) {
            return true;
        }
        else {
            return false;
        }
    };
    LeafNode.prototype.UpdateValue = function (address, value) {
        if (address == this.keyEnd) {
            this.changeValue(value);
            return true;
        }
        else {
            return false;
        }
    };
    return LeafNode;
}());
exports.LeafNode = LeafNode;
