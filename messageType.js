"use strict";
exports.__esModule = true;
var room_1 = require("./room");
//message type for switching system codes
var ServerMessageType;
(function (ServerMessageType) {
    ServerMessageType[ServerMessageType["RoomCreated"] = 0] = "RoomCreated";
    ServerMessageType[ServerMessageType["RoomExists"] = 1] = "RoomExists";
    ServerMessageType[ServerMessageType["RoomLeft"] = 2] = "RoomLeft";
    ServerMessageType[ServerMessageType["PlayerInRoom"] = 3] = "PlayerInRoom";
    ServerMessageType[ServerMessageType["UpdateRoomList"] = 4] = "UpdateRoomList";
    ServerMessageType[ServerMessageType["RoomJoined"] = 5] = "RoomJoined";
    ServerMessageType[ServerMessageType["RPC"] = 6] = "RPC";
    ServerMessageType[ServerMessageType["SIZE"] = 7] = "SIZE";
})(ServerMessageType = exports.ServerMessageType || (exports.ServerMessageType = {}));
var ClientMessageType;
(function (ClientMessageType) {
    ClientMessageType[ClientMessageType["CreateRoom"] = 0] = "CreateRoom";
    ClientMessageType[ClientMessageType["LeaveRoom"] = 1] = "LeaveRoom";
    ClientMessageType[ClientMessageType["JoinRoom"] = 2] = "JoinRoom";
    ClientMessageType[ClientMessageType["SendMessage"] = 3] = "SendMessage";
    ClientMessageType[ClientMessageType["QuickJoin"] = 4] = "QuickJoin";
    ClientMessageType[ClientMessageType["RPC"] = 5] = "RPC";
    ClientMessageType[ClientMessageType["SIZE"] = 6] = "SIZE";
})(ClientMessageType = exports.ClientMessageType || (exports.ClientMessageType = {}));
exports.OnReciveData = new Array(ClientMessageType.SIZE);
function createRoom(data, client) {
    var n = JSON.parse(data.toString())['n'];
    room_1.RoomManager.createRoom(n, client);
}
exports.OnReciveData[ClientMessageType.CreateRoom] = createRoom;
function leaveRoom(data, client) {
    room_1.RoomManager.leaveRoom(client);
}
exports.OnReciveData[ClientMessageType.LeaveRoom] = leaveRoom;
function sendmessage(data, client) {
    console.log('send message');
}
exports.OnReciveData[ClientMessageType.SendMessage] = sendmessage;
function quickjoin(data, client) {
    console.log('quick join');
}
exports.OnReciveData[ClientMessageType.QuickJoin] = quickjoin;
function joinRoom(data, client) {
    room_1.RoomManager.joinRoom(client, JSON.parse(data.toString())['n']);
}
exports.OnReciveData[ClientMessageType.JoinRoom] = joinRoom;
