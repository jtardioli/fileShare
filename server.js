const fs = require('fs');
const net =  require('net');
const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  client.setEncoding('utf8'); // interpret data as text
  console.log('New client connected!');
  client.write('Hello there!');
 
  client.on('data', (data) => {
    console.log('Client: ', data);
    fs.access(data, (error) => {
      if (error) {
        console.log(`File: ${data} not found!`);
        client.write(`File: ${data} not found!`);
      } else {
        fs.readFile(data, ('utf8'), (err, fileData) => {
          if (error) {
            console.log('Error reading file');
            client.write('Error reading file');
          } else {
            console.log('Data sent to client');
            client.write(fileData);
            console.log('Data sent to client');
          }
        });
      }
    });

  });
});