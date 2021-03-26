// Mongoose
const { Schema, model } = require( 'mongoose' );

const OpinionSchema = Schema({
  name: {
    type: String,
    required: [ true, 'El nombre es obligatorio' ],
    unique: true
  },
  testi: {
    type: String,
    required: [ true, 'La opinión es obligatorio' ]
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

OpinionSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}


// Exports
module.exports = model( 'Opinion', OpinionSchema ); 

