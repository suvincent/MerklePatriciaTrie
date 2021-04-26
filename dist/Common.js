"use strict";
exports.__esModule = true;
exports.rest = exports.longest = exports.HASH = exports.hashignore32 = exports.SHARLP = void 0;
var sha3_1 = require("sha3");
var ethereumjs_util_1 = require("ethereumjs-util");
var hash = new sha3_1.Keccak(256);
function SHARLP(input) {
    var R = ethereumjs_util_1.rlp.encode(input);
    if (R.byteLength < 32) {
        return input;
    }
    else {
        hash.reset();
        hash.update(R);
        return hash.digest();
    }
}
exports.SHARLP = SHARLP;
function hashignore32(input) {
    var R = ethereumjs_util_1.rlp.encode(input);
    console.log(R);
    hash.reset();
    hash.update(R);
    return hash.digest('hex');
}
exports.hashignore32 = hashignore32;
function HASH(input) {
    hash.reset();
    hash.update(input);
    return hash.digest('hex');
}
exports.HASH = HASH;
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
    return sub;
}
exports.longest = longest;
function rest(sub, origin) {
    var temp = "";
    for (var i = sub.length; i < origin.length; i++) {
        temp += origin[i];
    }
    return temp;
}
exports.rest = rest;
