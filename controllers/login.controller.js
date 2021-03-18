const { request, response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

const User = require( '../models/user.model' );
const { generateJWT } = require( '../helpers/generate-jwt.helper' );

const login = async( req = request, res = response ) => {
  const { name, password } = req.body;

  try {
    //Check if the name exists
    const user = await User.findOne({ name });

    if ( !user ) {
      return res.status( 400 ).json({
        msg: 'Usuario o contraseña incorrectos (usuario)'
      });
    }
    
    // If the user is active
    if ( !user.status ) {
      return res.status( 400 ).json({
        msg: 'Usuario o contraseña incorrectos (estado)'
      });
    }

    //  Verify password
    const validPassword = bcrypt.compareSync( password, user.password ); 

    if ( !validPassword ) {
      return res.status( 400 ).json({
        msg: 'Usuario o contraseña incorrectos (password)'
      });
    }

    // Generate the JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });
    
  } catch ( err ) {
    console.log( err );
    return res.status( 500 ).json({
      msg: 'Hable con el administrador'
    });
  } 
}

module.exports = {
  login
}