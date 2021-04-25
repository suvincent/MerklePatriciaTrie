import {SHARLP,longest,rest,hashignore32,HASH} from "./Common"

let hashD = SHARLP([parseInt("0x201355"),"45"])
let hashC = SHARLP([parseInt("0x209365"),"2"])
let hashB = SHARLP([null,hashD,null,null,null,null,null,null,null,null,null,null,null,null,null,hashC,null])
let hashA = hashignore32([167,hashB]);
// let test2 = [980489045,"45"] ;     
console.log("hashD : ",hashD)
console.log("hashC : ",hashC)
console.log("hashB : ",hashB)
console.log("hashA : ",hashA)
console.log("ANS1:","5991bb8c6514148a29db676a14ac506cd2cd5775ace63c30a4fe457715e9ac84")

// 'a711355' : '45'

console.log("testcase2",hashignore32([parseInt('0x3a711355'),"45"]))
console.log("ANS2:","a9116924943abeddebf1c0da975ebef7b2006ede340b0f9e18504b65b52948ed")