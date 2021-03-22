const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { validProgram } = require( '../helpers/db-validators.helper' ); 

// Middlewares
const { 
  validateJWT, 
  validateAdminRole,
  fieldValidator 
} = require('../middlewares');

// Controllers
const {
  getPrograms,
  getOneProgram,
  postProgram,
  putProgram,
  deleteProgram
} = require( '../controllers/program.controller' );

const router = Router();

// Get paginated programs
router.get( '/', getPrograms );

// Get a program by id
router.get( '/:id', [
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'id' ).custom( validProgram ),
  fieldValidator
], getOneProgram );

// Create a program
router.post( '/', [
  validateJWT,
  check( 'title', 'El título es obligatorio' ).not().isEmpty(),
  check( 'url', 'El url del video es obligatorio' ).not().isEmpty(),
  fieldValidator
], postProgram );

// Update a program
router.put( '/:id', [
  validateJWT,
  check( 'title', 'El título es obligatorio' ).not().isEmpty(),
  check( 'url', 'El url del video es obligatorio' ).not().isEmpty(),
  check( 'id' ).custom( validProgram ),
  fieldValidator
], putProgram );

// Delete a program
router.delete( '/:id', [
  validateJWT,
  validateAdminRole,
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'id' ).custom( validProgram ),
  fieldValidator
], deleteProgram );


// Exports
module.exports = router;

