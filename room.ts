import { Player } from "./Player";
import { ServerMessageType } from "./messageType";
import { Lobby } from "./Lobby";
import { RoomInfo } from "./RoomInfo";

export class Room {
    players: Player[];
    info: RoomInfo;

    constructor(public name: string) {
        this.players = [];
    }

    update(){
        this.info = new RoomInfo(this.name, this.players.length, "");
        Lobby.roomData[Lobby.roomData.findIndex(d => d.n === this.info.n)] = this.info;
        Lobby.update();
    }

    static addRoom(key: string, value: Room){
        RoomManager.rooms.set(key, value);
        value.info = new RoomInfo(key, 1, "");
        Lobby.roomData.push(value.info);

        Lobby.update();
    }

    static removeRoom(key: string){
        RoomManager.rooms.delete(key);
        Lobby.roomData.splice(Lobby.roomData.findIndex(r => r.n === key), 1);

        Lobby.update();
    }
}

export class RoomManager{
    static rooms = new Map<string, Room>();

    static createRoom(n: string, client:Player): boolean {
        if(this.rooms.has(n)) 
        {
            console.log("room already exists");
            // send failed
            client.SendMessage(ServerMessageType.RoomExists); 
            return false;
        }

        if(client.inRoom){
            
            console.log("player already in room");
            // send failed
            client.SendMessage(ServerMessageType.PlayerInRoom); 
            return false;
        }
        
        let r = new Room(n);
        client.joinRoom(r);
        Room.addRoom(r.name, r);
        
        r.players.push(client);
        console.log("=====================")
        console.log("ROOMS")
        this.rooms.forEach(rr => {
            console.log(rr.name);
        })
        console.log("=====================")

        // send successful
        client.SendMessage(ServerMessageType.RoomCreated); 

        return true;
    }

    static joinRoom(client:Player,roomName:string){
        
        if(client.inRoom){
            console.log("Failed to join room")
            return;
        }
        const room = this.rooms.get(roomName);

        if(!room){
            console.log("room exists nicht")
            return;
        }

        room.players.push(client);
        client.joinRoom(room);
        room.players.forEach((p, i) => {
            console.log(i);
        })

        room.update();
        client.SendMessage(ServerMessageType.RoomJoined);
        
    }

    static leaveRoom(client: Player):boolean{
        if(!client.inRoom){
            
            return false;
        }

        const n = client.roomName;
        this.rooms.get(client.roomName).players.forEach(p => {
            p.leaveRoom();
        });
        Room.removeRoom(n);
        
        client.SendMessage(ServerMessageType.RoomLeft);
        return true;
    }
}