import * as net from 'net';
import './messageType';
import { ClientMessageType, OnReciveData, ServerMessageType } from './messageType';
import { Player } from "./Player";
import { Room, RoomManager } from './room';
import { Lobby } from './Lobby';
import { QuickArray } from './QuickArray';

// main player array tha contains all tha players connected to the server 
export class CoolServer{
  static players = new QuickArray<Player>();

  static startServer(){
    const server = net.createServer((client: net.Socket) => {
      // adding the player to the main player array
      let player = new Player(client);
      player.id = this.players.add(player);
    
      //Auto add to lobby
      Lobby.addPlayer(player);
    
      console.log("new connection with id " + player.id + " - total connections: " + this.players.length);
      
      client.on('end', () => this.disconnect(player));
    
      client.on("data", (data) => OnReciveData[data[0]](data.slice(1), player));
    
      client.on("error", (err) => {
        console.log(err);
        let code = err["code"];
        if(code && code == "ECONNRESET") this.disconnect(player);
      });
    });
    
    server.listen(8124, () => {
      console.log('running server...');
    });

    this.listenForInputs();
  }

  static listenForInputs(){
    process.openStdin().addListener("data", d =>{
      this.players.forEach(player => {
        player.sendMessage(ServerMessageType.ServerEcho, d.toString());
      });
    })
  }

  static disconnect(player: Player){
    RoomManager.leaveRoom(player, true);

    Lobby.removePlayer(player);
    this.players.remove(player.id);
  
    console.log('client disconnected with id ' + player.id);
  }
}

CoolServer.startServer();