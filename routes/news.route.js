const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Helpers
const { validNews, validTitleN } = require( '../helpers/db-validators.helper' );

// Middlewares
const { 
  validateJWT, 
  fieldValidator 
} = require('../middlewares');

// Controllers
const { 
  getNews,
  getOneNews,
  postNews,
  putNews,
  deleteNews
} = require('../controllers/news.controller');

const router = Router();

router.get( '/', getNews );

router.get( '/:id', [
  check( 'id', 'No es un id de mongo válido' ).isMongoId(),
  check( 'id' ).custom( validNews ),
  fieldValidator
], getOneNews );

router.post( '/', [ 
  validateJWT,
  check( 'title', 'El título es obligatorio' ).not().isEmpty(),
  check( 'title' ).custom( validTitleN ),
  check( 'body', 'El cuerpo de la noticia es obligatorio' ).not().isEmpty(),
  fieldValidator
], postNews );

router.put( '/:id', [
  validateJWT,
  check( 'title', 'El título de la noticia el obligatorio' ).not().isEmpty(),
  check( 'title' ).custom( validTitleN ),
  check( 'body', 'El cuerpo de la noticia es obligatorio' ).not().isEmpty(),
  check( 'id' ).custom( validNews ),
  fieldValidator
], putNews );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'No es un id de mongo válido' ).isMongoId(),
  check( 'id' ).custom( validNews ),
  fieldValidator
], deleteNews );

module.exports = router;

