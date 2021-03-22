const express = require( 'express' );
const cors = require( 'cors' );

// Database
const { dbConnection } = require( '../database/config.db' );

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Route Paths
    this.paths = {
      auth: '/api/auth',
      news: '/api/news',
      programs: '/api/programs',
      users: '/api/users'
    }

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
    this.app.use( this.paths.auth, require( '../routes/auth.route' ) );
    this.app.use( this.paths.news, require( '../routes/news.route' ) );
    this.app.use( this.paths.programs, require( '../routes/program.route' ) );
    this.app.use( this.paths.users, require( '../routes/users.route' ) );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log( 'Listening on port:', this.port );
    });
  }
}


// Exports
module.exports = Server;
