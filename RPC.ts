export class RpcInfo{
    //function id
    f:number; 
    
    //object
    o:number;

    //data
    d:string;
    
    //target
    t:number;
    
    constructor(func :number, object: number, data: string , target:RpcTarget){
        this.f = func;
        this.o = object;
        this.d = data;
        this.t = target;
    }
}

export enum RpcTarget{
    All,
    Others,
    MasterClient,
    AllBuffered,
    OthersBuffered,
}