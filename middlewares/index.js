// Middlewares
const validateJWT = require('../middlewares/validate-jwt.middleware');
const fieldValidator = require( '../middlewares/validate.middleware' );
const validateAdminRole = require('../middlewares/validate-roles.middleware');

module.exports = {
  ...validateJWT,
  ...fieldValidator,
  ...validateAdminRole
}
