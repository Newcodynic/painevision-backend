const { request, response } = require( 'express' );

const validateAdminRole = async( req = request, res = response ,next ) => {
  if ( !req.user ) {
    return res.status( 500 ).json({
      msg: 'No se puede verificar el rol si un token válido'
    });
  }

  const { role, name } = req.user;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status( 401 ).json({
      msg: `${ name } no es administrador, no puede realizar esta acción`
    });
  }

  next();
}

module.exports = {
  validateAdminRole
}
