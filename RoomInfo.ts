export class RoomInfo{
    //name
    n:string; 
    
    //player count
    p:number;

    //data(client)
    d:string;

    constructor(name: string, playerCount: number, data: string){
        this.n = name;
        this.p = playerCount;
        this.d = data;
    }
}