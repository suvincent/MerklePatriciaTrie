
import {MerklePatriciaTrie} from "./MPT";
const testcase = {'7c3002ad756d76a643cb09cd45409608abb642d9' : '10', 
                  '7c303333756d555643cb09cd45409608abb642d9' : '20', 
                  '7c303333756d777643cb09c999409608abb642d9' : '30', 
                  '7c303333756d777643cb09caaa409608abb642d9' : '40',
                  '111102ad756d76a643cb09cd45409608abb642d9' : '50'}
var tree = new MerklePatriciaTrie();
let p = testcase
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        tree.AddNode(key,p[key])
    }
}
tree.print()
tree.list()