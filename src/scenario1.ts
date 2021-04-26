
import {MerklePatriciaTrie} from "./MPT";
import {testcase5} from './more_testcase';
var tree = new MerklePatriciaTrie();
let p = testcase5
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        tree.AddNode(key,p[key])
    }
}
tree.print()
tree.list()