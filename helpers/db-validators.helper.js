// Models
const { 
  News, 
  Program,
  Role, 
  User, 
  Opinion
} = require('../models');

// Validate role
const validRole = async( role = '' ) => {
  const roleExists = await Role.findOne({ role });  

  if ( !roleExists ) {
    throw new Error( `El rol ${ role } no está registrado en la base de datos` );
  }
}

// Validate name
const validName = async( name = '' ) => {
  const nameExists = await User.findOne({ name });  

  if ( nameExists ) {
    throw new Error( `El usuario ${ name } ya existe` );
  }
}

// Validate Id
const validId = async( id ) => {
  const userExists = await User.findById( id );  

  if ( !userExists ) {
    throw new Error( `No existe un usuario con el id ${ id }` );
  }
}

// Validate title
const validTitleP = async( title = '' ) => {
  const titleExists = await Program.findOne({ title });  

  if ( titleExists ) {
    throw new Error( `El título ${ title } ya existe` );
  }
}

const validTitleN = async( title = '' ) => {
  const titleExists = await News.findOne({ title });  

  if ( titleExists ) {
    throw new Error( `El título ${ title } ya existe` );
  }
}

// Validate Name Opinion
const validNameOp = async( name = '' ) => {
  const opiExists = await Opinion.findOne({ name });  

  if ( opiExists ) {
    throw new Error( `${ name } ya ha opinado` );
  }
}

// Validate News
const validNews = async( id ) => {
  const newsExists = await News.findById( id );  

  if ( !newsExists ) {
    throw new Error( `No existe una noticia con el id ${ id }` );
  }
}

// Validate Program
const validProgram = async( id ) => {
  const programExists = await Program.findById( id );  

  if ( !programExists ) {
    throw new Error( `No existe un programa con el id ${ id }` );
  }
}
 
// Validate Opinion
const validOpinion = async( id ) => {
  const opínionExists = await Opinion.findById( id );  

  if ( !opínionExists ) {
    throw new Error( `No existe una opinión con el id ${ id }` );
  }
}
 
// validate Collections
const allowedCollections = ( collection = '', collections = [] ) => {
  const include = collections.includes( collection );

  if ( !include ) {
    throw new Error( `La colección ${ collection } no es permitida` );
  }

  return true;
}


// Exports
module.exports = {
  validRole,
  validName,
  validNews,
  validOpinion,
  validTitleP,
  validTitleN,
  validId,
  validProgram,
  validNameOp,
  allowedCollections
}
