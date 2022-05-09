// Importaciones de node

// Importaciones de terceros
require('dotenv').config();
// Importaciones propias
const Server = require('./models/server');


const server = new Server();

server.listen();


