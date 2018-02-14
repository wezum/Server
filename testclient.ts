import * as net from 'net';

//let b :Array<Uint8Array>= [1,2,3];
let bb = Buffer.concat([new Buffer([2]), new Buffer("hello")]);

const client = net.createConnection({ port: 8124 }, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write(bb);
  client.end();
});


client.on('data', (data) => {
  console.log(data[0]);
  console.log(data.slice(1).toString());
  //client.end();
});


client.on('end', () => {
  console.log('disconnected from server');
});