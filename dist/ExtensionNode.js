"use strict";
exports.__esModule = true;
exports.ExtensionNode = void 0;
var BranchNode_1 = require("./BranchNode");
var Common_1 = require("./Common");
var ExtensionNode = (function () {
    function ExtensionNode(shared) {
        this.Init(shared);
    }
    ExtensionNode.prototype.Init = function (shared) {
        this.ChangeShard(shared);
        this.nextNode = new BranchNode_1.BranchNode();
    };
    ExtensionNode.prototype.ChangeShard = function (shared) {
        this.sharedNibble = shared;
        if (this.sharedNibble.length % 2 == 0) {
            this.prefix = 0;
        }
        else {
            this.prefix = 1;
        }
    };
    ExtensionNode.prototype.Addnode = function (k, v) {
        if (Common_1.longest(this.sharedNibble, k) == this.sharedNibble)
            this.nextNode.Addnode(Common_1.rest(this.sharedNibble, k), v);
        else {
            var currentNode = this;
            var newExtensionNode = new ExtensionNode(this.sharedNibble);
            newExtensionNode.nextNode = currentNode.nextNode;
            this.ChangeShard(Common_1.longest(this.sharedNibble, k));
            this.nextNode = new BranchNode_1.BranchNode();
            newExtensionNode.ChangeShard(Common_1.rest(this.sharedNibble, newExtensionNode.sharedNibble));
            var indexFornewExtensionNode = parseInt("0x" + newExtensionNode.sharedNibble[0]);
            newExtensionNode.ChangeShard(newExtensionNode.sharedNibble.substring(1, newExtensionNode.sharedNibble.length));
            this.nextNode.HexArray[indexFornewExtensionNode] = newExtensionNode;
            this.nextNode.Addnode(Common_1.rest(this.sharedNibble, k), v);
        }
        this.hash = this.hashself();
        return this.hash;
    };
    ExtensionNode.prototype.print = function (LEVEL) {
        var space = "";
        for (var i = 0; i < LEVEL; i++) {
            space += "    ";
        }
        if (this.prefix == 0)
            console.log(space, "EXTENSION : ", ["00" + this.sharedNibble]);
        else if (this.prefix == 1)
            console.log(space, "EXTENSION : ", ["1" + this.sharedNibble]);
        this.nextNode.print(LEVEL + 1);
    };
    ExtensionNode.prototype.list = function (flag) {
        if (flag) {
            if (this.prefix == 0)
                return [parseInt("0x00" + this.sharedNibble), this.nextNode.list(flag)];
            else if (this.prefix == 1)
                return [parseInt("0x1" + this.sharedNibble), this.nextNode.list(flag)];
        }
        else {
            if (this.prefix == 0)
                return ["00" + this.sharedNibble, this.nextNode.list(flag)];
            else if (this.prefix == 1)
                return ["1" + this.sharedNibble, this.nextNode.list(flag)];
        }
    };
    ExtensionNode.prototype.hashself = function () {
        if (this.prefix == 0) {
            return Common_1.SHARLP([Buffer.from("00" + this.sharedNibble, "hex"), this.nextNode.hashself()]);
        }
        else if (this.prefix == 1) {
            return Common_1.SHARLP([Buffer.from("1" + this.sharedNibble, "hex"), this.nextNode.hashself()]);
        }
    };
    ExtensionNode.prototype.checkExist = function (address) {
        if (Common_1.longest(this.sharedNibble, address) == this.sharedNibble) {
            return this.nextNode.checkExist(Common_1.rest(this.sharedNibble, address));
        }
        else {
            return false;
        }
    };
    ExtensionNode.prototype.UpdateValue = function (address, value) {
        if (Common_1.longest(this.sharedNibble, address)) {
            return this.nextNode.UpdateValue(Common_1.rest(this.sharedNibble, address), value);
        }
        else {
            return false;
        }
    };
    return ExtensionNode;
}());
exports.ExtensionNode = ExtensionNode;
