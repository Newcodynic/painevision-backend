const { request, response } = require( 'express' );
const { fileUpload } = require( '../helpers' );

// Models
const { 
  User, 
  News, 
  Program 
} = require( '../models' );

const uploadFiles = async( req = request, res = response ) => {

  if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {
    res.status(400).json({
      msg: 'No hay archivos que subir'
    });
    return;
  }

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

  const fileName = await fileUpload( req.files, undefined, collection );
  model.img = fileName;

  await model.save();

  res.json({
    model
  });
}


// Exports
module.exports = {
  uploadFiles,
  imageUpdate
}
