import { Keccak } from 'sha3';
// import {encode} from 'rlp'
import {bnToRlp, rlp} from 'ethereumjs-util';


const hash = new Keccak(256);
// const hash = keccak256

export function SHARLP(input:any){
    // let R = encode(input)
    // console.log(input)
    let R = rlp.encode(input);
    // console.log(R);
    // console.log(rlp.decode(R))
    // console.log(R.byteLength)
    if(R.byteLength < 32){
        return input
    }
    else{
        hash.reset()
        hash.update(R);
        return hash.digest();
    }   
}

export function hashignore32(input:any){
    let R = rlp.encode(input);
    console.log(R)
    hash.reset()
    hash.update(R);
    return hash.digest('hex');
}

export function HASH(input:any){
    hash.reset()
    hash.update(input);
    return hash.digest('hex');
}

export function longest (a : string,b: string){
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

export function rest (sub:string,origin:string){
    let temp = "";
    for(let i  = sub.length;i < origin.length;i++){
        temp += origin[i]
    }
    return temp
}