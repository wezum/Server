import * as net from 'net';
import './messageType';
import { ClientMessageType, OnReciveData } from './messageType';
import { Player } from "./Player";
import { Room } from './room';
import { Lobby } from './Lobby';


var stdin = process.openStdin();
var clients = Array<Player>();

const server = net.createServer((c: net.Socket) => {
  // 'connection' listener
  let player = new Player(c);
  clients.push(player);

  //Auto add to lobby
  Lobby.addPlayer(player);
  Lobby.update();

  console.log("someone connected " + clients.length);

  
  c.on('end', () => {
    disconnect(c);
  });


  c.on("data", (data) => 
  {
    dataRouter(data, player);
  });
 
  stdin.addListener("data",d =>{
      c.write("WESAM:"+d.toString());
  })

  c.on("error", (err) => {
    let code = err["code"];
    console.log(err);
    if(code){
      switch(code){
        case "EPIPE":
        break;
        case "ECONNRESET":
        disconnect(c);
        break;

      }
    }
  });

});

server.listen(8124, () => {
  console.log('server bound');
});

function dataRouter(data: Buffer , client: Player ) {
  OnReciveData[data[0]](data.slice(1) , client );
}

function broadCast(c: Player, data: Buffer) {
  clients.forEach(a=>{
    if(a!==c){
      //a.SendMessage( data);
      }
    })
}

function disconnect (socket:net.Socket){
  var clientIndex = clients.findIndex(a=>a.socket===socket);
  Lobby.players.splice(Lobby.players.findIndex(a => a.socket === socket), 1);
  console.log('client disconnected');
  clients.splice(clientIndex,1);
}
