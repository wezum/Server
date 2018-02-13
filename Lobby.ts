import { Player } from "./Player";
import { RoomManager } from "./room";
import { ServerMessageType } from "./messageType";
import { RoomInfo } from "./RoomInfo";

export class Lobby {
    static players: Player[] = [];
    static roomData: RoomInfo[] = [];

    static addPlayer(player: Player){
        this.players.push(player);
    }

    static removePlayer(player: Player){
        this.players.splice(this.players.findIndex(p => p === player), 1);
    }

    static update(){
        const roomData = JSON.stringify(Lobby.roomData);
        Lobby.players.forEach(player => {
            player.SendMessage(ServerMessageType.UpdateRoomList, roomData);
        });
    }
}