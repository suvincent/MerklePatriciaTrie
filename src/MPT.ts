
import {LeafNode} from './LeafNode';
import {ExtensionNode} from './ExtensionNode'
import {BranchNode} from './BranchNode'
import { SHARLP,longest,rest ,hashignore32} from './Common';

export class MerklePatriciaTrie{
    root : any;
    roothash : string;
    constructor(){

    }

    AddNode(address:string , value:any){
        if(!this.root){
            this.root = new LeafNode()
            this.root.Addnode(address,value);
            return
        }
        if(this.checkExist(address)){
            console.log("This node is already exist")
            return
        }
        // 若現在node是 leaf node
        if(this.root.constructor.name == LeafNode.name){
            let subaddress = longest(this.root.keyEnd,address);
            let tempExtension = new ExtensionNode(subaddress);
            tempExtension.Addnode(address,value)
            tempExtension.Addnode(this.root.keyEnd,this.root.value)
            this.root = tempExtension;
        }
        // 若現在node是 Branch node
        else if(this.root.constructor.name == BranchNode.name){
            this.root.Addnode(address,value)
        }
        // 若現在node是 Extension node
        else if(this.root.constructor.name == ExtensionNode.name){
            // this.root.Addnode(this.rest(this.root.sharedNibble,address),value)
            // console.log("A",address)
            // console.log("S",this.root.sharedNibble)
            if(this.root.sharedNibble[0] == address[0]){
                this.root.Addnode(address,value)
            }
            else{
                // 如果第一個address char就不一樣 root要換成Branch node
                let tempBranch = new BranchNode();
                let index = this.root.sharedNibble[0];
                this.root.sharedNibble = this.root.sharedNibble.substring(1,this.root.sharedNibble.length);
                // console.log("CS",this.root.sharedNibble)
                tempBranch.HexArray[index] = this.root;
                tempBranch.Addnode(address,value)
                this.root = tempBranch;
            }
        }
    }

    checkExist(address: string){
        return this.root.checkExist(address);
    }

    UpdateValue(address:string , value:any){
        if(!this.checkExist(address)){
            console.log("This node is not exist")
            return
        }
        return this.root.UpdateValue(address,value);
    }

    print(){
        let temp = this.root;
        temp.print(0);  
    }
    
    list(){
        let result = this.root.list(true)
        let jsonResult = JSON.stringify(this.root.list(false))
        console.log(jsonResult);
        // console.log(SHARLP(result));
        // console.log(typeof(this.root.hash));
        
        if(Buffer.isBuffer(this.root.hash)){
            this.roothash = this.root.hash.toString("hex")
        }
        else if(typeof(this.root.hash) != typeof("string")){
            this.roothash = hashignore32(this.root.hash);
        }
        else{
            this.roothash = this.root.hash;
        }
        console.log("ROOTHASH :　",this.roothash)
    }
}