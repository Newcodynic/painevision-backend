// Models
const News = require( './news.model' );
const Opinion = require( './opinion.model' );
const Program = require( './program.model' );
const Role = require( './role.model' );
const Server = require( './server.model' );
const User = require( './user.model' );


// Exports
module.exports = {
  News,
  Opinion,
  Program,
  Role,
  ...Server,
  User
}
