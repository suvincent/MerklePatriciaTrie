import {SHARLP} from "./Common"
export class LeafNode{
    prefix : number;
    keyEnd : string;
    value : any;
    hash : any;
    constructor(){

    }
    Addnode(k:string,v:any){
        if(k.length%2 == 0){
            // Leaf node with even number of keyend
            this.prefix = 2
        }
        else{
            // Leaf node with odd number of keyend
            this.prefix = 3
        }
        this.keyEnd = k;
        this.changeValue(v)
        return this.hash
    }
    changeValue(new_value:any){
        this.value = new_value;
        this.hash = this.hashself()
    }
    changeKeyend(new_key:string){
        this.keyEnd = new_key;
        this.hash = this.hashself()
    }

    hashself(){
        if(this.prefix == 2) {
            // return SHARLP([Buffer.from(this.keyEnd,"hex"),this.value]) // 偶數
            return SHARLP([parseInt("0x20"+this.keyEnd),this.value]) // 偶數
        }
        else if(this.prefix == 3) {
            // return SHARLP([Buffer.from(this.keyEnd,"hex"),this.value]) // 奇數
            return SHARLP([parseInt("0x3"+this.keyEnd),this.value]) // 奇數

        }
    }

    print(LEVEL :number){
        // console.log(this);
        let space = "";
        for(let i = 0;i<LEVEL;i++){
            space += "    ";
        }
        
        if(this.prefix == 2) console.log(space , "LEAF : ", ["20"+this.keyEnd,this.value]) // 偶數
        else if(this.prefix == 3) console.log(space , "LEAF : ", ["3"+this.keyEnd,this.value]) // 奇數
    }

    list(flag:boolean){
        if(flag){
            if(this.prefix == 2) return [parseInt("0x20"+this.keyEnd),this.value] // 偶數
            else if(this.prefix == 3) return [parseInt("0x3"+this.keyEnd),this.value] // 奇數
        }
        else{
            if(this.prefix == 2) return ["20"+this.keyEnd,this.value] // 偶數
            else if(this.prefix == 3) return ["3"+this.keyEnd,this.value] // 奇數
            // return this.hash;
        }
        
    }

    checkExist(address: string){
        if(address == this.keyEnd){
            return true;
        }
        else{
            return false;
        }
    }

    UpdateValue(address:string , value:any){
        if(address == this.keyEnd){
            this.changeValue(value)
            return true;
        }
        else{
            return false;
        }
    }
}