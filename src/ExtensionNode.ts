import {LeafNode} from './LeafNode';
import {BranchNode} from './BranchNode'
import {SHARLP,longest,rest} from "./Common"
export class ExtensionNode{
    prefix : number;
    sharedNibble : string;
    nextNode : BranchNode;
    hash : any;
    constructor(shared:string){
        // 設定 sharedNibble & prefix
        this.Init(shared)
    }

    Init(shared:string){
        this.ChangeShard(shared)
        this.nextNode = new BranchNode();
    }

    ChangeShard(shared:string){
        this.sharedNibble = shared
        if(this.sharedNibble.length%2 == 0){
            // Leaf node with even number of keyend
            this.prefix = 0
        }
        else{
            // Leaf node with odd number of keyend
            this.prefix = 1
        }
    }

    Addnode(k:string,v:number){
        // input address 與 sharedNibble 一致 => Add node 在 branchNode下
        if(longest(this.sharedNibble,k) ==  this.sharedNibble)
            this.nextNode.Addnode(rest(this.sharedNibble,k),v);
        // input address 與 sharedNibble 不一致 => 重設Extension Node並重接之前node進度
        else{
            // console.log("K",k)
            // console.log("S",this.sharedNibble)
            let currentNode = this;// k = 686f727365
            // newExtensionNode作為複製current node的功能
            let newExtensionNode = new ExtensionNode(this.sharedNibble);//new sharedNibble = 646f
            newExtensionNode.nextNode = currentNode.nextNode;

            // this.sharedNibble = this.longest(this.sharedNibble,k);// old sharedNibble = 6
            this.ChangeShard(longest(this.sharedNibble,k))
            // console.log("C S",this.sharedNibble)
            this.nextNode = new BranchNode()

            // newExtensionNode.sharedNibble = this.rest(this.sharedNibble,newExtensionNode.sharedNibble)  // should be 46f
            newExtensionNode.ChangeShard(rest(this.sharedNibble,newExtensionNode.sharedNibble))
            // console.log("N S",newExtensionNode.sharedNibble)
            let indexFornewExtensionNode = parseInt("0x"+ newExtensionNode.sharedNibble[0]);
            newExtensionNode.ChangeShard(newExtensionNode.sharedNibble.substring(1,newExtensionNode.sharedNibble.length)) // should be 6f
            // console.log("C N S",newExtensionNode.sharedNibble)
            
            this.nextNode.HexArray[indexFornewExtensionNode] = newExtensionNode;
            this.nextNode.Addnode(k.substring(1,k.length),v);// 86f7273
        }
        this.hash = this.hashself()
        return this.hash
    }

    print(LEVEL:number){
        let space = "";
        for(let i = 0;i<LEVEL;i++){
            space += "    ";
        }
        if(this.prefix == 0) console.log(space , "EXTENSION : ", ["00"+this.sharedNibble]);// 偶數
        else if(this.prefix == 1) console.log(space , "EXTENSION : ", ["1"+this.sharedNibble]); // 奇數
        this.nextNode.print(LEVEL + 1);
        // console.log(this);
    }

    list(flag:boolean){
        if(flag){
            if(this.prefix == 0) return [parseInt("0x00"+this.sharedNibble),this.nextNode.list(flag)];// 偶數
            else if(this.prefix == 1) return [parseInt("0x1"+this.sharedNibble),this.nextNode.list(flag)]; // 奇數
        }
        else{
            if(this.prefix == 0) return ["00"+this.sharedNibble,this.nextNode.list(flag)];// 偶數
            else if(this.prefix == 1) return ["1"+this.sharedNibble,this.nextNode.list(flag)]; // 奇數
            // return this.hash
        }
    }

    hashself(){
        if(this.prefix == 0) {
            // return SHARLP([Buffer.from(this.sharedNibble,"hex"),this.nextNode.hashself()]);// 偶數
            return SHARLP([parseInt("0x00"+this.sharedNibble),this.nextNode.hashself()]);// 偶數
        }
        else if(this.prefix == 1) {
            // return SHARLP([Buffer.from(this.sharedNibble,"hex"),this.nextNode.hashself()]); // 奇數
            return SHARLP([parseInt("0x１"+this.sharedNibble),this.nextNode.hashself()]); // 奇數

        }
    }

    checkExist(address: string){
        if(longest(this.sharedNibble,address)){
            return this.nextNode.checkExist(rest(this.sharedNibble,address))
        }
        else{
            return false
        }
    }

    UpdateValue(address:string , value:any){
        if(longest(this.sharedNibble,address)){
            return this.nextNode.UpdateValue(rest(this.sharedNibble,address),value)
        }
        else{
            return false
        }
    }
}