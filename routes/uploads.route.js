// Express
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { allowedCollections } = require('../helpers');

// Middlewares
const { fieldValidator, validateFile } = require('../middlewares');

// Controllers
const { 
  uploadFiles, 
  imageUpdateCloud,
  showPicture 
} = require( '../controllers/uploads.controller' );

const router = Router();

router.get( '/:collection/:id', [
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'programs', 'news' ] ) ),
  fieldValidator
], showPicture ); 

router.post( '/', validateFile, uploadFiles );

router.put( '/:collection/:id', [
  validateFile,
  check( 'id', 'No es us id de mongo válido' ).isMongoId(),  
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'programs', 'news' ] ) ),
  fieldValidator
], imageUpdateCloud ); 


// Exports
module.exports = router;

