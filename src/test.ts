import {SHARLP,longest,rest,hashignore32,HASH} from "./Common"

let hashD = SHARLP([Buffer.from("201355","hex"),"45"])
// let hashD = SHARLP([parseInt("0x201355"),"45"])
let hashC = SHARLP([Buffer.from("209365","hex"),"2"])
// let hashC = SHARLP([parseInt("0x209365"),"2"])
let hashB = SHARLP([Buffer.from(""),hashD,Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),Buffer.from(""),hashC,Buffer.from("")])
let hashA = hashignore32([Buffer.from('00a7',"hex"),hashB]);
// let test2 = [980489045,"45"] ;     
console.log("hashD : ",hashD)
console.log("hashC : ",hashC)
console.log("hashB : ",hashB)
console.log("hashA : ",hashA)
console.log("ANS1:","39067a59d2192dbde0af0968ba50ac88d02a41e3a9e06834e6f3490edec03cb5")

// 'a711355' : '45'

console.log("testcase2",hashignore32([parseInt('0x3a711355'),"45"]))
console.log("ANS2:","a9116924943abeddebf1c0da975ebef7b2006ede340b0f9e18504b65b52948ed")

// console.log(Buffer.from("c783201355823435","ascii"))