const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { validRole, validName, validId } = require( '../helpers/db-validators.helper' );

// Middlewares
const { validateJWT } = require('../middlewares/validate-jwt.middleware');
const { fieldValidator } = require( '../middlewares/validate.middleware' );

// Controllers
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
} = require( '../controllers/users.controller' );

const router = Router();

router.get( '/', getUsers );

router.post( '/',[
  check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'password', 'La contraseña es obligatoria y debe contener al menos 6 carácteres' ).isLength({ min: 6 }),
  check( 'name' ).custom( validName ),
  check( 'role' ).custom( validRole ),
  fieldValidator
], postUser );

router.put( '/:id', [
  check( 'id', 'No es un ID válido' ).isMongoId(),
  check( 'id' ).custom( validId ),
  check( 'role' ).custom( validRole ),
  fieldValidator
], putUser );

router.patch( '/', patchUser );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'No es un ID válido' ).isMongoId(),
  check( 'id' ).custom( validId ),
  fieldValidator
], deleteUser );

module.exports =  router;
 
