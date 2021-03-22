const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

// Models
const User = require( '../models/user.model' );

// Validate JWT
const validateJWT = async( req = request, res = response, next ) => {
  const token = req.header( 'x-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // Read user corresponding to uid
    const user = await User.findById( uid );

    if ( !user ) {
      return res.status( 401 ).json({
        msg: 'Token no válido'
      });
    }

    // Check if uid has status in true
    if ( !user.status ) {
      return res.status( 401 ).json({
        msg: 'Token no válido'
      });
    }
  
    req.user = user;
    next();

  } catch ( err ) {
    console.log( err );
    res.status( 401 ).json({
      msg: 'Token no válido'
    });
  }
}


// Exports
module.exports = {
  validateJWT
}
