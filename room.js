"use strict";
exports.__esModule = true;
var messageType_1 = require("./messageType");
var Lobby_1 = require("./Lobby");
var RoomInfo_1 = require("./RoomInfo");
var Room = /** @class */ (function () {
    function Room(name) {
        this.name = name;
        this.players = [];
    }
    Room.prototype.update = function () {
        var _this = this;
        this.info = new RoomInfo_1.RoomInfo(this.name, this.players.length, "");
        Lobby_1.Lobby.roomData[Lobby_1.Lobby.roomData.findIndex(function (d) { return d.n === _this.info.n; })] = this.info;
        Lobby_1.Lobby.update();
    };
    Room.addRoom = function (key, value) {
        RoomManager.rooms.set(key, value);
        value.info = new RoomInfo_1.RoomInfo(key, 1, "");
        Lobby_1.Lobby.roomData.push(value.info);
        Lobby_1.Lobby.update();
    };
    Room.removeRoom = function (key) {
        RoomManager.rooms["delete"](key);
        Lobby_1.Lobby.roomData.splice(Lobby_1.Lobby.roomData.findIndex(function (r) { return r.n === key; }), 1);
        Lobby_1.Lobby.update();
    };
    return Room;
}());
exports.Room = Room;
var RoomManager = /** @class */ (function () {
    function RoomManager() {
    }
    RoomManager.createRoom = function (n, client) {
        if (this.rooms.has(n)) {
            console.log("room already exists");
            // send failed
            client.SendMessage(messageType_1.ServerMessageType.RoomExists);
            return false;
        }
        if (client.inRoom) {
            console.log("player already in room");
            // send failed
            client.SendMessage(messageType_1.ServerMessageType.PlayerInRoom);
            return false;
        }
        var r = new Room(n);
        client.joinRoom(r);
        Room.addRoom(r.name, r);
        r.players.push(client);
        console.log("=====================");
        console.log("ROOMS");
        this.rooms.forEach(function (rr) {
            console.log(rr.name);
        });
        console.log("=====================");
        // send successful
        client.SendMessage(messageType_1.ServerMessageType.RoomCreated);
        return true;
    };
    RoomManager.joinRoom = function (client, roomName) {
        if (client.inRoom) {
            console.log("Failed to join room");
            return;
        }
        var room = this.rooms.get(roomName);
        if (!room) {
            console.log("room exists nicht");
            return;
        }
        room.players.push(client);
        client.joinRoom(room);
        room.players.forEach(function (p, i) {
            console.log(i);
        });
        room.update();
        client.SendMessage(messageType_1.ServerMessageType.RoomJoined);
    };
    RoomManager.leaveRoom = function (client) {
        if (!client.inRoom) {
            return false;
        }
        var n = client.roomName;
        this.rooms.get(client.roomName).players.forEach(function (p) {
            p.leaveRoom();
        });
        Room.removeRoom(n);
        client.SendMessage(messageType_1.ServerMessageType.RoomLeft);
        return true;
    };
    RoomManager.rooms = new Map();
    return RoomManager;
}());
exports.RoomManager = RoomManager;
