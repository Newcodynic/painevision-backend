const { Schema, model } = require( 'mongoose' );

const ProgramSchema = Schema({
  title: {
    type: String,
    required: [ true, 'El título es obligatorio' ],
    unique: true
  },
  url: {
    type: String,
    required: [ true, 'El url es obligatorio' ]
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

ProgramSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}


// Exports
module.exports = model( 'Program', ProgramSchema ); 
