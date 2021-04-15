"use strict";
exports.__esModule = true;
exports.MerklePatriciaTrie = exports.ExtensionNode = exports.BranchNode = exports.LeafNode = void 0;
var LeafNode = (function () {
    function LeafNode(k, v) {
        if (k.length % 2 == 0) {
            this.prefix = 2;
        }
        else {
            this.prefix = 3;
        }
        this.keyEnd = k;
        this.value = v;
    }
    LeafNode.prototype.print = function () {
        console.log(this);
    };
    return LeafNode;
}());
exports.LeafNode = LeafNode;
var BranchNode = (function () {
    function BranchNode() {
        this.HexArray = new Array(16);
    }
    BranchNode.prototype.Addnode = function (k, v) {
        var index = parseInt("0x" + k[0]);
        if (this.HexArray[index]) {
            if (this.HexArray[index].constructor.name == LeafNode.name) {
                var Leaf = this.HexArray[index];
                var subaddress = this.longest(Leaf.keyEnd, k.substring(1, k.length));
                var tempExtension = new ExtensionNode(subaddress);
                tempExtension.Addnode(k.substring(1, k.length), v);
                tempExtension.Addnode(Leaf.keyEnd, Leaf.value);
                this.HexArray[index] = tempExtension;
            }
            else if (this.HexArray[index].constructor.name == ExtensionNode.name) {
                this.HexArray[index].Addnode(k.substring(1, k.length), v);
            }
        }
        else {
            console.log("QQ", k.substring(1, k.length));
            this.HexArray[index] = new LeafNode(k.substring(1, k.length), v);
        }
    };
    BranchNode.prototype.print = function () {
        for (var index = 0; index < 16; index++) {
            if (this.HexArray[index]) {
                this.HexArray[index].print();
            }
        }
        console.log(this);
    };
    BranchNode.prototype.longest = function (a, b) {
        var sub = "";
        for (var i = 0; i < a.length; i++) {
            if (a[i] == b[i]) {
                sub += a[i];
            }
            else {
                break;
            }
        }
        return sub;
    };
    BranchNode.prototype.rest = function (sub, origin) {
        var temp = "";
        for (var i = sub.length; i < origin.length; i++) {
            temp += origin[i];
        }
        return temp;
    };
    return BranchNode;
}());
exports.BranchNode = BranchNode;
var ExtensionNode = (function () {
    function ExtensionNode(shared) {
        this.AddShard(shared);
    }
    ExtensionNode.prototype.AddShard = function (shared) {
        this.sharedNibble = shared;
        if (this.sharedNibble.length % 2 == 0) {
            this.prefix = 0;
        }
        else {
            this.prefix = 1;
        }
        this.nextNode = new BranchNode();
    };
    ExtensionNode.prototype.Addnode = function (k, v) {
        this.nextNode.Addnode(this.rest(this.sharedNibble, k), v);
    };
    ExtensionNode.prototype.longest = function (a, b) {
        var sub = "";
        for (var i = 0; i < a.length; i++) {
            if (a[i] == b[i]) {
                sub += a[i];
            }
            else {
                break;
            }
        }
        return sub;
    };
    ExtensionNode.prototype.print = function () {
        this.nextNode.print();
        console.log(this);
    };
    ExtensionNode.prototype.rest = function (sub, origin) {
        var temp = "";
        for (var i = sub.length; i < origin.length; i++) {
            temp += origin[i];
        }
        return temp;
    };
    return ExtensionNode;
}());
exports.ExtensionNode = ExtensionNode;
var MerklePatriciaTrie = (function () {
    function MerklePatriciaTrie() {
    }
    MerklePatriciaTrie.prototype.AddNode = function (address, value) {
        if (!this.root) {
            this.root = new LeafNode(address, value);
            return;
        }
        if (this.root.constructor.name == LeafNode.name) {
            var subaddress = this.longest(this.root.keyEnd, address);
            var tempExtension = new ExtensionNode(subaddress);
            tempExtension.Addnode(address, value);
            tempExtension.Addnode(this.root.keyEnd, this.root.value);
            this.root = tempExtension;
        }
        else if (this.root.constructor.name == BranchNode.name) {
            this.root.Addnode(address, value);
        }
        else if (this.root.constructor.name == ExtensionNode.name) {
            this.root.Addnode(address, value);
        }
    };
    MerklePatriciaTrie.prototype.CalculateHash = function () {
    };
    MerklePatriciaTrie.prototype.longest = function (a, b) {
        var sub = "";
        for (var i = 0; i < a.length; i++) {
            if (a[i] == b[i]) {
                sub += a[i];
            }
            else {
                break;
            }
        }
        return sub;
    };
    MerklePatriciaTrie.prototype.rest = function (sub, origin) {
        var temp = "";
        for (var i = sub.length; i < origin.length; i++) {
            temp += origin[i];
        }
        return temp;
    };
    MerklePatriciaTrie.prototype.print = function () {
        var temp = this.root;
        temp.print();
    };
    return MerklePatriciaTrie;
}());
exports.MerklePatriciaTrie = MerklePatriciaTrie;
