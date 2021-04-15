
export class LeafNode{
    prefix : number;
    keyEnd : string;
    value : number;
    constructor(k:string,v:number){
        if(k.length%2 == 0){
            // Leaf node with even number of keyend
            this.prefix = 2
        }
        else{
            // Leaf node with odd number of keyend
            this.prefix = 3
        }
        this.keyEnd = k;
        this.value = v;
    }
    print(){
        console.log(this);
    }
}

export class BranchNode{
    HexArray : Array<any>[16];
    value : number;
    constructor(){
        this.HexArray = new Array<any>(16)
    }
    Addnode(k:string,v:number){
        let index = parseInt("0x"+ k[0])
        if(this.HexArray[index]){
            if(this.HexArray[index].constructor.name == LeafNode.name){
                let Leaf = this.HexArray[index];
                let subaddress = this.longest(Leaf.keyEnd,k.substring(1,k.length));
                let tempExtension = new ExtensionNode(subaddress);
                tempExtension.Addnode(k.substring(1,k.length),v)
                tempExtension.Addnode(Leaf.keyEnd,Leaf.value)
                this.HexArray[index] = tempExtension;
            }
            else if(this.HexArray[index].constructor.name == ExtensionNode.name){
                this.HexArray[index].Addnode(k.substring(1,k.length),v);
            }
        } 
        else{
            console.log("QQ",k.substring(1,k.length))
            this.HexArray[index] = new LeafNode(k.substring(1,k.length),v);
        }
    }
    print(){
        for(let index = 0;index < 16 ;index ++){
            if(this.HexArray[index]){
                this.HexArray[index].print()
            }
        }
        console.log(this);
    }
    longest (a : string,b: string){
        let sub = "";
        for(let i  = 0;i < a.length;i++){
            if(a[i] == b[i]){
                sub += a[i]
            }
            else{
                break;
            }
        }
        return sub
    }
    rest (sub:string,origin:string){
        let temp = "";
        for(let i  = sub.length;i < origin.length;i++){
            temp += origin[i]
        }
        return temp
    }
    // AddExistLeaf(l:LeafNode){
    //     let index = parseInt("0x"+ l.keyEnd[0], 10)
    //     console.log(index);
    //     if(this.HexArray[index]){

    //     }
    //     else{
    //         this.HexArray[index] = l;
    //     }
    // }
}

export class ExtensionNode{
    prefix : number;
    sharedNibble : string;
    nextNode : BranchNode;
    constructor(shared:string){
        this.AddShard(shared)
    }
    AddShard(shared:string){
        this.sharedNibble = shared
        if(this.sharedNibble.length%2 == 0){
            // Leaf node with even number of keyend
            this.prefix = 0
        }
        else{
            // Leaf node with odd number of keyend
            this.prefix = 1
        }
        this.nextNode = new BranchNode();
    }

    Addnode(k:string,v:number){
        this.nextNode.Addnode(this.rest(this.sharedNibble,k),v);
    }

    longest (a : string,b: string){
        let sub = "";
        for(let i  = 0;i < a.length;i++){
            if(a[i] == b[i]){
                sub += a[i]
            }
            else{
                break;
            }
        }
        return sub
    }
    print(){
        this.nextNode.print();
        console.log(this);
    }
    rest (sub:string,origin:string){
        let temp = "";
        for(let i  = sub.length;i < origin.length;i++){
            temp += origin[i]
        }
        return temp
    }
}

export class MerklePatriciaTrie{
    root : any;
    constructor(){

    }

    AddNode(address:string , value:number){
        if(!this.root){
            this.root = new LeafNode(address,value);
            return
        }
        // 若現在node是 leaf node
        if(this.root.constructor.name == LeafNode.name){
            let subaddress = this.longest(this.root.keyEnd,address);
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
            this.root.Addnode(address,value)
        }
    }

    CalculateHash(){
        
    }

    longest (a : string,b: string){
        let sub = "";
        for(let i  = 0;i < a.length;i++){
            if(a[i] == b[i]){
                sub += a[i]
            }
            else{
                break;
            }
        }
        return sub
    }

    rest (sub:string,origin:string){
        let temp = "";
        for(let i  = sub.length;i < origin.length;i++){
            temp += origin[i]
        }
        return temp
    }

    print(){
        let temp = this.root;
        temp.print();  
    }
}