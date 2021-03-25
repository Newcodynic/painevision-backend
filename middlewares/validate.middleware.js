// Express
const { request, response } = require( 'express' );
const { validationResult } = require( 'express-validator' );


// Field Validator
const fieldValidator = ( req = request, res = response, next ) => {
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( errors );
  }

  next();
}


// Exports
module.exports = {
  fieldValidator
}
