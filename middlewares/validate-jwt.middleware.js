const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

// Models
const User = require( '../models/user.model' );

const validateJWT = async( req = request, res = response, next ) => {
  const token = req.header( 'x-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // Read user corresponding to uidi
    const user = await User.findById( uid );

    // Check if user is active
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

  next();
}

module.exports = {
  validateJWT
}
