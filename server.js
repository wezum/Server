"use strict";
exports.__esModule = true;
var net = require("net");
require("./messageType");
var messageType_1 = require("./messageType");
var Player_1 = require("./Player");
var Lobby_1 = require("./Lobby");
var stdin = process.openStdin();
var clients = Array();
var server = net.createServer(function (c) {
    // 'connection' listener
    var player = new Player_1.Player(c);
    clients.push(player);
    //Auto add to lobby
    Lobby_1.Lobby.addPlayer(player);
    Lobby_1.Lobby.update();
    console.log("someone connected " + clients.length);
    c.on('end', function () {
        disconnect(c);
    });
    c.on("data", function (data) {
        dataRouter(data, player);
    });
    stdin.addListener("data", function (d) {
        c.write("WESAM:" + d.toString());
    });
    c.on("error", function (err) {
        var code = err["code"];
        console.log(err);
        if (code) {
            switch (code) {
                case "EPIPE":
                    break;
                case "ECONNRESET":
                    disconnect(c);
                    break;
            }
        }
    });
});
server.listen(8124, function () {
    console.log('server bound');
});
function dataRouter(data, client) {
    messageType_1.OnReciveData[data[0]](data.slice(1), client);
}
function broadCast(c, data) {
    clients.forEach(function (a) {
        if (a !== c) {
            //a.SendMessage( data);
        }
    });
}
function disconnect(socket) {
    var clientIndex = clients.findIndex(function (a) { return a.socket === socket; });
    Lobby_1.Lobby.players.splice(Lobby_1.Lobby.players.findIndex(function (a) { return a.socket === socket; }), 1);
    console.log('client disconnected');
    clients.splice(clientIndex, 1);
}
