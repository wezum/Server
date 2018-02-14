import { Player } from "./Player";
import { RoomManager } from "./room";
import { ServerMessageType } from "./messageType";
import { RoomInfo } from "./RoomInfo";
import { QuickArray } from "./QuickArray";
import { CoolServer } from "./server";

export class Lobby {
    private static players = new QuickArray<Player>();
    static roomData = new QuickArray<RoomInfo>();
    static roomDataJSON = "";

    static addPlayer(player: Player){
        player["lobbyId"] = this.players.add(player);

        this.updatePlayer(player);
    }

    static removePlayer(player: Player){
        this.players.remove(player["lobbyId"]);
    }

    static update(updatedElement: RoomInfo | string, remove?: boolean){
        this.roomDataJSON = JSON.stringify(Lobby.roomData.array);
        let element;
        if(!remove){
            element = JSON.stringify(updatedElement);
        }
        Lobby.players.forEach((player: Player) => {
            if(remove){
                player.sendMessage(ServerMessageType.RemoveFromRoomList, updatedElement);
            }else{
                player.sendMessage(ServerMessageType.UpdateRoomList, element);
            }
        });
    }

    private static updatePlayer(player: Player){
        if(!this.roomDataJSON) return;

        player.sendMessage(ServerMessageType.UpdateRoomList, this.roomDataJSON);
    }
}