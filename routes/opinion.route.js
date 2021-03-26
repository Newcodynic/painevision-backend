// Express
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { validNameOp, validOpinion } = require( '../helpers' );

// Middlewares
const { 
  validateJWT, 
  fieldValidator 
} = require('../middlewares');

// Controllers
const { 
  getOpinions, 
  getOneOpinion, 
  postOpinion, 
  putOpinion, 
  deleteOpinion 
} = require('../controllers/opinion.controller');


const router = Router();

// Get paginated opinions
router.get( '/', getOpinions );

router.get( '/:id', [
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'id' ).custom( validOpinion ),
  fieldValidator
], getOneOpinion );

// Get a opinion
router.post( '/', [
  validateJWT,
  check( 'name', 'El nombre el obligatorio' ).not().isEmpty(),
  check( 'name' ).custom( validNameOp ),
  check( 'testi', 'El testimonio es obligatorio' ).not().isEmpty(),
  fieldValidator
], postOpinion  );

// Update a opinion
router.put( '/:id', [
  validateJWT,
  check( 'name', 'El nombre el obligatorio' ).not().isEmpty(),
  check( 'name' ).custom( validNameOp ),
  check( 'testi', 'El testimonio es obligatorio' ).not().isEmpty(),
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'id' ).custom( validOpinion ),
  fieldValidator
], putOpinion );

// Delete a opinion
router.delete( '/:id', [
  validateJWT,
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'id' ).custom( validOpinion ),
  fieldValidator
], deleteOpinion );


// Exports
module.exports = router;

