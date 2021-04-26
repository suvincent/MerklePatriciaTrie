import {LeafNode} from './LeafNode';
import {ExtensionNode} from './ExtensionNode'
import {SHARLP,longest,rest} from "./Common"
export class BranchNode{
    HexArray : Array<any>[16];
    value : any;
    hash : any;
    constructor(){
        this.HexArray = new Array<any>(16)
        // this.value = 0
    }

    Addnode(k:string,v:any){
        if(k==""){
            this.value = v
            return
        }
        let index = parseInt("0x"+ k[0])
        if(this.HexArray[index]){
            if(this.HexArray[index].constructor.name == LeafNode.name){
                // 先把目前Leaf存下來
                let Leaf = this.HexArray[index];
                // 找出目前Leaf 與新增的node之間最長的substring
                let subaddress = longest(Leaf.keyEnd,k.substring(1,k.length));
                // 創extensionnode
                let tempExtension = new ExtensionNode(subaddress);
                // extensionNode 下的Branch Node加入新增node
                tempExtension.Addnode(k.substring(1,k.length),v)
                // extensionNode 下的Branch Node加入已存在的Leaf 不用做substring
                tempExtension.Addnode(Leaf.keyEnd,Leaf.value)
                // HexArray 內容從Leaf換成 ExtensionNode
                this.HexArray[index] = tempExtension;
                // Leaf 不用 自己destroy 因為 javascript是 automatically garbage collected
            }
            else if(this.HexArray[index].constructor.name == ExtensionNode.name){
                this.HexArray[index].Addnode(k.substring(1,k.length),v);
            }
        } 
        else{
            // console.log("QQ",k.substring(1,k.length))
            // console.log(v)
            // if(k.substring(1,k.length).length > 0){
                this.HexArray[index] = new LeafNode()
                this.HexArray[index].Addnode(k.substring(1,k.length),v);
            // }
            // else{
            //     this.value = v
            // }
            
        }
        this.hash = this.hashself()
        return this.hash
    }

    print(LEVEL : number){
        let space = "";
        for(let i = 0;i<LEVEL;i++){
            space += "    ";
        }
        console.log(space , "Branch : ")
        for(let index = 0;index < 16 ;index ++){
            if(this.HexArray[index]){
                console.log(space ,index)
                this.HexArray[index].print(LEVEL + 1)
            }
        }
        // console.log(this);
    }

    list(flag:boolean){
        let arr = [];
        for(let index = 0;index < 16 ;index ++){
            if(this.HexArray[index]){
                arr[index] = this.HexArray[index].list(flag)
            }
            else{
                // arr[index] = 0
            }
        }
        arr[16] = this.value
        return arr;
    }

    hashself(){
        let arr = [];
        for(let index = 0;index < 16 ;index ++){
            if(this.HexArray[index]){
                arr[index] = this.HexArray[index].hashself();
            }
            else{
                arr[index] = Buffer.from('')
            }
        }
        if(this.value)
            arr[16] = this.value
        else
            arr[16] = Buffer.from('')
        return SHARLP(arr);
    }

    checkExist(address: string){
        let key = parseInt("0x"+ address[0])
        if(this.HexArray[key]){
            return this.HexArray[key].checkExist(address.substring(1,address.length))
        }
        else{
            return false
        }
    }

    UpdateValue(address:string , value:any){
        let key = parseInt("0x"+ address[0])
        if(this.HexArray[key]){
            return this.HexArray[key].UpdateValue(address.substring(1,address.length),value)
        }
        else{
            return false
        }
    }
}