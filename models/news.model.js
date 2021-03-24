const { Schema, model } = require( 'mongoose' );

const NewsSchema = Schema({
  title: {
    type: String,
    required: [ true, 'El título es obligatorio' ],
    unique: true
  },
  body: {
    type: String,
    required: [ true, 'El cuerpo de la noticia es obligatorio' ]
  },
  date: {
    type: Date,
    default: Date.now()
  },
  img: {
    type: String
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

NewsSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}


// Exports
module.exports = model( 'News', NewsSchema ); 
