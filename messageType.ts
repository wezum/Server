import { Room, RoomManager } from "./room";
import { Socket } from "net";
import { Player } from "./Player";

//message type for switching system codes

export enum ServerMessageType{
    RoomCreated,
    RoomExists,
    RoomLeft,
    PlayerInRoom,
    UpdateRoomList,
    RoomJoined,
    RPC,
    SIZE
}


export enum ClientMessageType {
    CreateRoom,
    LeaveRoom,
    JoinRoom,
    SendMessage,
    QuickJoin,
    RPC,
    SIZE
}

export const OnReciveData = new Array(ClientMessageType.SIZE);

function createRoom(data: Buffer, client: Player){
    let n = JSON.parse(data.toString())['n'];
    RoomManager.createRoom(n, client);
}
OnReciveData[ClientMessageType.CreateRoom]= createRoom;



function leaveRoom(data: Buffer ,  client: Player){
    RoomManager.leaveRoom(client);
}
OnReciveData[ClientMessageType.LeaveRoom]= leaveRoom;



function sendmessage(data: Buffer , client: Player){
    console.log('send message');
}
OnReciveData[ClientMessageType.SendMessage]= sendmessage;



function quickjoin(data: Buffer ,  client: Player){
    console.log('quick join');
}
OnReciveData[ClientMessageType.QuickJoin]= quickjoin;



function joinRoom(data: Buffer ,  client: Player){
    RoomManager.joinRoom(client,JSON.parse(data.toString())['n'])
}
OnReciveData[ClientMessageType.JoinRoom]= joinRoom;




