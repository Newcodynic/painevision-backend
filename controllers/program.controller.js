// Express
const { request, response } = require( 'express' );

// Models
const { Program } = require( '../models' );


// Get paginated programs
const getPrograms = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true }

  const [ total, program ] = await Promise.all([
    Program.countDocuments( query ),
    Program.find( query )
        .populate( 'user', 'name' )
        .skip( Number( from ) )
        .limit( Number( limit ) )
  ]);

  res.json({
    ok: true,
    total,
    program
  });
}

// Get a program by id
const getOneProgram = async( req = request, res = response ) => {
  const { id } = req.params;
  const program = await Program.findById( id ).populate( 'user', 'name' );

  res.json({
    program
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

// Update a program
const putProgram = async( req = request, res = response ) => {
  const { id } = req.params;
  const { status, user, ...data } =  req.body;
  data.user = req.user._id;

  const program = await Program.findByIdAndUpdate( id, data, { new: true } );

  res.json({
    program
  });
}

// Delete a program
const deleteProgram = async( req = request, res = response ) => {
  const { id } = req.params;
  const delProgram = await Program.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.json({
    delProgram
  });
}


// Exports
module.exports = {
  getPrograms,
  getOneProgram,
  postProgram,
  putProgram,
  deleteProgram
}

