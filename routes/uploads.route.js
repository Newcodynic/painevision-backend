const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { allowedCollections } = require('../helpers');

// Middlewares
const { fieldValidator } = require('../middlewares');

// Controllers
const { uploadFiles, imageUpdate } = require( '../controllers/uploads.controller' );

const router = Router();

router.post( '/', uploadFiles );

router.put( '/:collection/:id', [
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'programs', 'news' ] ) ),
  fieldValidator
], imageUpdate ); 


// Exports
module.exports = router;

