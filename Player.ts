import { Socket } from "net";
import { Room } from "./room";
import { ServerMessageType } from "./messageType";
import { Lobby } from "./Lobby";

export class Player {
    id: number;
    room: Room;
    playerData: any;

    constructor(public socket: Socket){}

    leaveRoom(disconnected?: boolean) {
        if(!disconnected){
            Lobby.addPlayer(this);
        }

        this.room = null;
    }
    
    joinRoom(room: Room) {
        Lobby.removePlayer(this);

        this.room = room;
    }

    sendMessage(type: ServerMessageType, data?:any) {
        let b: Buffer;
        let dataBuffer = new Buffer(data ? data : 0);
        let bufferLength= new Buffer(new Uint16Array([dataBuffer.length + 1]).buffer)

        if(data){
            b = Buffer.concat([ bufferLength, new Buffer([type]), dataBuffer]);
        }else{
            b = Buffer.concat([ bufferLength, new Buffer([type])]);
        }

        console.log("buffer size:"+ (dataBuffer.length+1))
        this.socket.write(b); 
    } 
}