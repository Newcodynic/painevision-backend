// Express
const { request, response } = require( 'express' );

// Models
const { Opinion } = require( '../models' );

const getOpinions = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true }

  const [ total, opinions ] = await Promise.all([
    Opinion.countDocuments( query ),
    Opinion.find( query )
        .populate( 'user', 'name' )
        .skip( Number( from ) )
        .limit( Number( limit ) )
  ]);

  res.json({
    ok: true,
    total,
    opinions
  });
}

const getOneOpinion = async( req = request, res = response ) => {
  const { id } = req.params;
  const opinion = await Opinion.findById( id ).populate( 'user', 'name' );

  res.json({
    opinion
  });
}

// Create a program
const postProgram = async( req = request, res = response ) => {
  const { title, url } = req.body;

  
  const programDB = await Program.findOne({ title });

  if ( programDB ) {
    return res.status( 400 ).json({
      msg: `El programa con el título ${ programDB.title }, ya existe`
    });
  }

  // Generate data to save
  const data = { 
    title,
    url,
    user: req.user._id
  }

  const program = new Program( data );

  // Save to DB
  await program.save();

  res.status( 201 ).json({
    program
  });
}

const postOpinion = async( req = request, res = response ) => {
  const { name, testi } = req.body;

  
  const opinionDB = await Opinion.findOne({ name, testi });

  if ( opinionDB ) {
    return res.status( 400 ).json({
      msg: `${ opinionDB.name } ya dió su opinión`
    });
  }

  // Generate data to save
  const data = { 
    name,
    testi,
    user: req.user._id
  }

  const opinion = new Opinion( data );

  // Save to DB
  await opinion.save();

  res.status( 201 ).json({
    opinion
  });
}

const putOpinion = async( req = request, res = response ) => {
  const { id } = req.params;
  const { status, user, ...data } =  req.body;
  data.user = req.user._id;

  const opinion = await Opinion.findByIdAndUpdate( id, data, { new: true } );

  res.json({
    opinion
  });
}

const deleteOpinion = async( req = request, res = response ) => {
  const { id } = req.params;
  const delOpinion = await Opinion.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.json({
    delOpinion
  });
}


module.exports = {
  getOpinions,
  getOneOpinion,
  postOpinion,
  putOpinion,
  deleteOpinion
}

