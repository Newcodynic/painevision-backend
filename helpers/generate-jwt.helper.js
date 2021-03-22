const jwt = require( 'jsonwebtoken' );

// Generate JWT
const generateJWT = ( uid = '' ) => {
  return new Promise( ( resolve, reject ) => {
    const payload = { uid }; 

    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, ( err, token ) => {
      if ( err ) {
        console.log( err );
        reject( 'No se pudo generar el token' );
      } else {
        resolve( token );
      }
    });
  }); 
}


// Exports
module.exports = {
  generateJWT
}
