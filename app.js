// Dotenv
require( 'dotenv' ).config();

// Server
const Server = require( './models/server.model' );

const server = new Server();
server.listen();

 
