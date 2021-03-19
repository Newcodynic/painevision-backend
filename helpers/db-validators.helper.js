// Models
const User = require( '../models/user.model' );
const Role = require( '../models/role.model' );

const validRole = async( role = '' ) => {
  const roleExists = await Role.findOne({ role });  

  if ( !roleExists ) {
    throw new Error( `El rol ${ role } no está registrado en la base de datos` );
  }
}

const validName = async( name = '' ) => {
  const nameExists = await User.findOne({ name });  

  if ( nameExists ) {
    throw new Error( `El usuario ${ name } ya existe` );
  }
}

const validId = async( id ) => {
  const userExists = await User.findById( id );  

  if ( !userExists ) {
    throw new Error( `No existe un usuario con el id ${ id }` );
  }
}

module.exports = {
  validRole,
  validName,
  validId
}
