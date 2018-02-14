import { Player } from "./Player";
import { ServerMessageType } from "./messageType";
import { Lobby } from "./Lobby";
import { RoomInfo } from "./RoomInfo";

export class Room {
    players: Player[] = [];
    info: RoomInfo;
    infoId: number;

    constructor(public name: string) { }

    update(){
        this.info = new RoomInfo(this.name, this.players.length, "");
        Lobby.roomData[this.infoId] = this.info;
        Lobby.update(this.info);
    }

    static addRoom(key: string, value: Room){
        RoomManager.rooms.set(key, value);
        value.info = new RoomInfo(key, 1, "");
        value.infoId = Lobby.roomData.add(value.info);

        Lobby.update(value.info);
    }

    static removeRoom(room: Room){
        const name: string = room.name;
        RoomManager.rooms.delete(room.name);
        Lobby.roomData.remove(room.infoId);

        Lobby.update(name, true);
    }
}

export class RoomManager{
    static rooms = new Map<string, Room>();

    static createRoom(n: string, client:Player): boolean {
        if(this.rooms.has(n)) 
        {
            console.log("room already exists");
            // send failed
            client.sendMessage(ServerMessageType.RoomExists); 
            return false;
        }

        if(client.room){
            
            console.log("player already in room");
            // send failed
            client.sendMessage(ServerMessageType.PlayerInRoom); 
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
        client.sendMessage(ServerMessageType.RoomCreated); 

        return true;
    }

    static joinRoom(client:Player,roomName:string){
        
        if(client.room){
            console.log("client is already in a room")
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
        client.sendMessage(ServerMessageType.RoomJoined);
        
    }

    static leaveRoom(client: Player, disconnected?: boolean):boolean{
        if(!client.room){
            return false;
        }

        const r = client.room;
        client.leaveRoom(disconnected);
        Room.removeRoom(r);
        
        if(!disconnected){
            client.sendMessage(ServerMessageType.RoomLeft);
            Lobby.addPlayer(client);
        }
        return true;
    }
}