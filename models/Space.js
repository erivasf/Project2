const {Schema,model} = require('Mongoose')
const spaceSchema = new Schema({
  location:{
      adress: String,
      coordinates:[Number]
      },
  dimensions: {
    type:String, 
    required: true,
    enum:['S', 'M', 'L'] //Dimensión máxima de auto
  },
  availability:{
    period: {
      type: String, 
      enum: ["ALL DAY", "SPECIFIC HOURS"]
    }, 
    interval:[Number] //En formato de 24 hrs  Ej: [08, 20]
  }, {
    timestamps:true
  }
})

module.exports = model('Space', spaceSchema)