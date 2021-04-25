"use strict";
exports.__esModule = true;
exports.MerklePatriciaTrie = void 0;
var LeafNode_1 = require("./LeafNode");
var ExtensionNode_1 = require("./ExtensionNode");
var BranchNode_1 = require("./BranchNode");
var Common_1 = require("./Common");
var MerklePatriciaTrie = (function () {
    function MerklePatriciaTrie() {
    }
    MerklePatriciaTrie.prototype.AddNode = function (address, value) {
        if (!this.root) {
            this.root = new LeafNode_1.LeafNode();
            this.root.Addnode(address, value);
            return;
        }
        if (this.checkExist(address)) {
            console.log("This node is already exist");
            return;
        }
        if (this.root.constructor.name == LeafNode_1.LeafNode.name) {
            var subaddress = Common_1.longest(this.root.keyEnd, address);
            var tempExtension = new ExtensionNode_1.ExtensionNode(subaddress);
            tempExtension.Addnode(address, value);
            tempExtension.Addnode(this.root.keyEnd, this.root.value);
            this.root = tempExtension;
        }
        else if (this.root.constructor.name == BranchNode_1.BranchNode.name) {
            this.root.Addnode(address, value);
        }
        else if (this.root.constructor.name == ExtensionNode_1.ExtensionNode.name) {
            if (this.root.sharedNibble[0] == address[0]) {
                this.root.Addnode(address, value);
            }
            else {
                var tempBranch = new BranchNode_1.BranchNode();
                var index = this.root.sharedNibble[0];
                this.root.sharedNibble = this.root.sharedNibble.substring(1, this.root.sharedNibble.length);
                tempBranch.HexArray[index] = this.root;
                tempBranch.Addnode(address, value);
                this.root = tempBranch;
            }
        }
    };
    MerklePatriciaTrie.prototype.checkExist = function (address) {
        return this.root.checkExist(address);
    };
    MerklePatriciaTrie.prototype.UpdateValue = function (address, value) {
        if (!this.checkExist(address)) {
            console.log("This node is not exist");
            return;
        }
        return this.root.UpdateValue(address, value);
    };
    MerklePatriciaTrie.prototype.print = function () {
        var temp = this.root;
        temp.print(0);
    };
    MerklePatriciaTrie.prototype.list = function () {
        var result = this.root.list(true);
        var jsonResult = JSON.stringify(this.root.list(false));
        console.log(jsonResult);
        if (typeof (this.root.hash) != typeof ("string")) {
            this.roothash = Common_1.hashignore32(this.root.hash);
        }
        else {
            this.roothash = this.root.hash;
        }
        console.log("ROOTHASH :　", this.roothash);
    };
    return MerklePatriciaTrie;
}());
exports.MerklePatriciaTrie = MerklePatriciaTrie;
