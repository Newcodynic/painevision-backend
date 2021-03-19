const { request, response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

// Models
const User = require( '../models/user.model' );


const getUsers = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true }

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
        .skip( Number( from ) )
        .limit( Number( limit ) )
  ]);

  res.json({
    ok: true,
    total,
    users
  });
}

const postUser = async( req = request, res = response ) => {

  const { name, password, role } = req.body;
  const user = new User({ name, password, role });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt );

  // Save to db
  await user.save();

  res.json({
    ok: true,
    user
  });
}

const putUser = async( req = request, res = response ) => {
  const { id } = req.params;
  const { _id, password, name, ...resto } = req.body;

  // Validate against the database
  if ( password ) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( id, resto );

  res.json({
    ok: true,
    user
  });
}

const patchUser = ( req = request, res = response ) => {
  res.json({
    ok: true,
    msg: 'patch API'
  });
}

const deleteUser = async( req = request, res = response ) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate( id, { status: false } );
  const authenticatedUser = req.user;

  res.json({
    ok: true,
    user
  });
}

module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
}
