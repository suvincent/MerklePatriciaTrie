"use strict";
exports.__esModule = true;
var Common_1 = require("./Common");
var hashD = Common_1.SHARLP([parseInt("0x201355"), "45"]);
var hashC = Common_1.SHARLP([parseInt("0x209365"), "2"]);
var hashB = Common_1.SHARLP([null, hashD, null, null, null, null, null, null, null, null, null, null, null, null, null, hashC, null]);
var hashA = Common_1.hashignore32([167, hashB]);
console.log("hashD : ", hashD);
console.log("hashC : ", hashC);
console.log("hashB : ", hashB);
console.log("hashA : ", hashA);
console.log("ANS1:", "5991bb8c6514148a29db676a14ac506cd2cd5775ace63c30a4fe457715e9ac84");
console.log("testcase2", Common_1.hashignore32([parseInt('0x3a711355'), "45"]));
console.log("ANS2:", "a9116924943abeddebf1c0da975ebef7b2006ede340b0f9e18504b65b52948ed");
