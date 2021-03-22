const { Schema, model } = require( 'mongoose' );

const RoleSchema = Schema({
  role: {
    type: String,
    required: [ true, 'El rol es obligatorio' ]
  }
});


// Exports
module.exports = model( 'Role', RoleSchema ); 
