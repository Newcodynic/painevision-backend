const path = require( 'path' );
const fs = require( 'fs' );

// Cloudinary
const cloudinary = require( 'cloudinary' ).v2;
cloudinary.config( process.env.CLOUDINARY_URL );

// Express
const { request, response } = require( 'express' );

// Helpers
const { fileUpload } = require( '../helpers' );

// Models
const { 
  User, 
  News, 
  Program 
} = require( '../models' );


const uploadFiles = async( req = request, res = response ) => {

  try {
    // Images
    const fileName = await fileUpload( req.files, undefined, 'images' );

    res.json({
      name
    });
  } catch ( err ) {
    res.status( 400 ).json({ 
      err 
    });
  }
}

const imageUpdate = async( req = request, res = response ) => { 

  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
    
      break;

    case 'news':
      model = await News.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe una noticia con el id ${ id }`
        });
      }
    
      break;

    case 'programs':
      model = await Program.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un programa con el id ${ id }`
        });
      }
    
      break;

    default:
      return res.status( 500 ).json({
        msg: 'Hable con el administrador'
      });
  }

  // Clean previous images
  if ( model.img ) {
    const pathImg = path.join( __dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( pathImg ) ) {
      fs.unlinkSync( pathImg );
    }
  }


  const fileName = await fileUpload( req.files, undefined, collection );
  model.img = fileName;

  await model.save();

  res.json({
    model
  });
}

const imageUpdateCloud = async( req = request, res = response ) => { 

  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
    
      break;

    case 'news':
      model = await News.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe una noticia con el id ${ id }`
        });
      }
    
      break;

    case 'programs':
      model = await Program.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un programa con el id ${ id }`
        });
      }
    
      break;

    default:
      return res.status( 500 ).json({
        msg: 'Hable con el administrador'
      });
  }

  // Clean previous images
  if ( model.img ) {
    const nombreArr = model.img.split( '/' );
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split( '.' );

    await cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  model.img = secure_url;

  await model.save();

  res.json({
    model
  });
}

const showPicture = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
    
      break;

    case 'news':
      model = await News.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe una noticia con el id ${ id }`
        });
      }
    
      break;

    case 'programs':
      model = await Program.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          msg: `No existe un programa con el id ${ id }`
        });
      }
    
      break;

    default:
      return res.status( 500 ).json({
        msg: 'Hable con el administrador'
      });
  }

  // Clean previous images
  if ( model.img ) {
    const pathImg = path.join( __dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( pathImg ) ) {
      return res.sendFile( pathImg );
    } 
  }

  const pathImg = path.join( __dirname, '../assets/no-image.jpg' );
  res.sendFile( pathImg );
}


// Exports
module.exports = {
  uploadFiles,
  imageUpdateCloud,
  imageUpdate,
  showPicture
}
