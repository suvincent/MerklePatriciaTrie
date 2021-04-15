declare const Buffer
import {MerklePatriciaTrie} from "./MPT";
import { Keccak } from 'sha3';
// const hash = new Keccak(256);
// let message: string = 'Hello World';
// let qq : LeafNode = new LeafNode(message,0);
// const buffer = Buffer.from('Hello world!');
// hash.update(buffer);
// let a = hash.digest('hex');
// console.log(a)
// console.log(message);
// testcase3 = {'a711355' : '45', 'a7f9365' : '2'}

var tree = new MerklePatriciaTrie();
tree.AddNode("a711355",10)
tree.AddNode("a7f9365",20)
tree.AddNode("a77d337",40)
tree.AddNode("a77d397",50)
// console.log(tree.root)
tree.print()

// longest("a711355","a7f9365")

function longest (a : string,b: string){
    let sub = "";
    for(let i  = 0;i < a.length;i++){
        if(a[i] == b[i]){
            sub += a[i]
        }
        else{
            break;
        }
    }
    console.log(sub)
}