// Express
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { fieldValidator } = require('../middlewares/validate.middleware');

// Controllers
const { login } = require( '../controllers/login.controller' );

const router = Router();

router.post( '/login', [
  check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
  fieldValidator
], login );


// Exports
module.exports = router;

