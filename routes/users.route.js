// Express
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { validRole, validName, validId } = require( '../helpers/db-validators.helper' );

// Middlewares
const { 
  fieldValidator, 
  validateJWT, 
  validateAdminRole 
} = require( '../middlewares' );

// Controllers
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
} = require( '../controllers/users.controller' );

const router = Router();

// Get paginated users
router.get( '/', getUsers );

// Create an user
router.post( '/',[
  check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'password', 'La contraseña es obligatoria y debe contener al menos 6 carácteres' ).isLength({ min: 6 }),
  check( 'name' ).custom( validName ),
  check( 'role' ).custom( validRole ),
  fieldValidator
], postUser );

// Update an user
router.put( '/:id', [
  check( 'id', 'No es un ID válido' ).isMongoId(),
  check( 'id' ).custom( validId ),
  check( 'role' ).custom( validRole ),
  fieldValidator
], putUser );

// Delete an user
router.delete( '/:id', [
  validateJWT,
  validateAdminRole,
  check( 'id', 'No es un ID válido' ).isMongoId(),
  check( 'id' ).custom( validId ),
  fieldValidator
], deleteUser );

// Exports
module.exports =  router;
 
