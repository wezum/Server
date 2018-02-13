"use strict";
exports.__esModule = true;
var messageType_1 = require("./messageType");
var Lobby = /** @class */ (function () {
    function Lobby() {
    }
    Lobby.addPlayer = function (player) {
        this.players.push(player);
    };
    Lobby.removePlayer = function (player) {
        this.players.splice(this.players.findIndex(function (p) { return p === player; }), 1);
    };
    Lobby.update = function () {
        var roomData = JSON.stringify(Lobby.roomData);
        Lobby.players.forEach(function (player) {
            player.SendMessage(messageType_1.ServerMessageType.UpdateRoomList, roomData);
        });
    };
    Lobby.players = [];
    Lobby.roomData = [];
    return Lobby;
}());
exports.Lobby = Lobby;
