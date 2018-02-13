"use strict";
exports.__esModule = true;
var Lobby_1 = require("./Lobby");
var Player = /** @class */ (function () {
    function Player(socket) {
        this.socket = socket;
        this.inRoom = false;
        this.roomName = "";
    }
    Player.prototype.leaveRoom = function () {
        Lobby_1.Lobby.addPlayer(this);
        this.inRoom = false;
        this.roomName = "";
    };
    Player.prototype.joinRoom = function (room) {
        Lobby_1.Lobby.removePlayer(this);
        this.inRoom = true;
        this.roomName = room.name;
    };
    Player.prototype.SendMessage = function (type, data) {
        var b;
        var dataBuffer = new Buffer(data ? data : 0);
        var bufferLength = new Buffer(new Uint16Array([dataBuffer.length + 1]).buffer);
        if (data) {
            b = Buffer.concat([bufferLength, new Buffer([type]), dataBuffer]);
        }
        else {
            b = Buffer.concat([bufferLength, new Buffer([type])]);
        }
        console.log("buffer size:" + (dataBuffer.length + 1));
        this.socket.write(b);
    };
    return Player;
}());
exports.Player = Player;
