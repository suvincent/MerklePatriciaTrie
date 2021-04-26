declare const Buffer
import {MerklePatriciaTrie} from "./MPT";
import {SHARLP,longest,rest,hashignore32} from "./Common"
import {testcase1,testcase2,testcase3,testcase4,testcase5,testcase6} from './more_testcase';
// import { encode } from "rlp";
// var RLP = require('rlp')
// const hash = new Keccak(256);
// console.log(SHARLP([980489045,"45"]))
// testcase3 {'a711355' : '45', 'a7f9365' : '2'}
//5991bb8c6514148a29db676a14ac506cd2cd5775ace63c30a4fe457715e9ac84
// ["00a7",['\x00',["201355","45"],'\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00',["209365","2"],'\x00']]
// let hashD = SHARLP([2102101,"45"])
// let hashC = SHARLP([2134885,"2"])
// let hashB = SHARLP(['\x00',hashD,'\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00','\x00',hashC,'\x00'])
// let hashA = SHARLP([167,hashB]);
// // let test2 = [980489045,"45"] ;     
// console.log("hashD : ",hashD)
// console.log("hashC : ",hashC)
// console.log("hashB : ",hashB)
// console.log("hashA : ",hashA)
// console.log(hashignore32([ Buffer.from("a71135","hex"),Buffer.from('45') ]))
// console.log(hashignore32([ Buffer.from("a71135",""), '45' ]))
// // let message: string = 'Hello World';
// // let qq : LeafNode = new LeafNode(message,0);
// const buffer = Buffer.from('7465737456616c7565',"hex");
// console.log(buffer)
// hash.update(buffer);
// let a = hash.digest('hex');
// console.log(a)
// console.log(message);
// testcase3 = {'a711355' : '45', 'a7f9365' : '2'}
var tree = new MerklePatriciaTrie();
let p = testcase6
// tree.AddNode("7465737456616c7565","testValue")
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        // console.log(key + " -> " + p[key]);
        tree.AddNode(key,p[key])
    }
}

// console.log("checkExist: ",tree.checkExist("a711355"))
// tree.AddNode("a7f9365",20)
// tree.AddNode("a77d337",40)
// tree.AddNode("a77d397",50)
// // console.log(tree.root)
tree.print()
tree.list()

// console.log('\x00')
// console.log(Buffer.from('\x00'))
// console.log(Buffer.from('0'))
// let index = parseInt("0x")
// console.log(index)
// let HexArray = new Array<any>(16)
// console.log(HexArray[index])