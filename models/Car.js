const {Schema, model} = require('mongoose')
const carSchema = new Schema({
  color: {
    type: String, 
    required: true
  },
  plateNumber: {
    type: String,
    required: true
  },
  model:{
    type: String,
    required:true
  },
  dimensions: {
      type: String,
      enum: ['S', 'M', 'L'], 
      required: true
  }
},
  {
  timestamps: true
  }
)

module.exports = model('Car', carSchema)