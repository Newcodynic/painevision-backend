const { request, response } = require( 'express' );

// Models
const { News } = require( '../models' );

// Get paginated news
const getNews = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true }

  const [ total, news ] = await Promise.all([
    News.countDocuments( query ),
    News.find( query )
        .populate( 'user', 'name' )
        .skip( Number( from ) )
        .limit( Number( limit ) )
  ]);

  res.json({
    ok: true,
    total,
    news
  });
}

// Get a news by id
const getOneNews = async( req = request, res = response ) => {
  const { id } = req.params;
  const news = await News.findById( id ).populate( 'user', 'name' );

  res.json({
    news
  });

}

// Create a news
const postNews = async( req = request, res = response ) => {
  const { title, body } = req.body;

  const newsDB = await News.findOne({ title, body });

  if ( newsDB ) {
    return res.status( 400 ).json({
      msg: `La noticia con el título ${ newsDB.title }, ya existe`
    });
  }

  // Generate data to save
  const data = { 
    title,
    body,
    user: req.user._id
  }

  const news = new News( data );

  // Save to DB
  await news.save();

  res.status( 201 ).json({
    news
  });
}

// Update news
const putNews = async( req = request, res = response ) => {
  const { id } = req.params;
  const { status, user, ...data } =  req.body;
  data.user = req.user._id;

  const news = await News.findByIdAndUpdate( id, data, { new: true } );

  res.json({
    news
  });
}

// Delete news
const deleteNews = async( req = request, res = response ) => {
  const { id } = req.params;
  const delNews = await News.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.json({
    delNews
  });
}


// Exports
module.exports = {
  getNews,
  getOneNews,
  postNews,
  putNews,
  deleteNews
}
