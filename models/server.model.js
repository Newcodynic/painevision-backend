const express = require( 'express' );
const cors = require( 'cors' );

// Database
const { dbConnection } = require( '../database/config.db' );

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Route Paths
    this.usrPath = '/api/users';
    this.authPath = '/api/auth';

    // Connect to DB
    this.connectDB();


    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection(); 
  }

  middlewares() {
    // CORS
    this.app.use( cors() );
    
    // Body Parse
    this.app.use( express.json() );
    
    // Public
    this.app.use( express.static( 'public' ) );
  }
  
  routes() {
    this.app.use( this.authPath, require( '../routes/auth.route' ) );
    this.app.use( this.usrPath, require( '../routes/users.route' ) );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log( 'Listening on port:', this.port );
    });
  }
}

module.exports = Server;
