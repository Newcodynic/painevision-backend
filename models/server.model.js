// Express
const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );

// Cors
const cors = require( 'cors' );

// Database
const { dbConnection } = require( '../database/config.db' );

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Route Paths
    this.paths = {
      auth:     '/api/auth',
      news:     '/api/news',
      opinion: '/api/opinions',
      programs: '/api/programs',
      uploads:  '/api/uploads',
      users:    '/api/users'
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

    // Fileupload
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }
  
  routes() {
    this.app.use( this.paths.auth, require( '../routes/auth.route' ) );
    this.app.use( this.paths.news, require( '../routes/news.route' ) );
    this.app.use( this.paths.opinion, require( '../routes/opinion.route' ) );
    this.app.use( this.paths.programs, require( '../routes/program.route' ) );
    this.app.use( this.paths.uploads, require( '../routes/uploads.route' ) );
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
