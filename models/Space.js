const {Schema,model} = require('Mongoose')
const spaceSchema = new Schema({
  address:String,
  location:{
      type: {
        type:String,
        default:'Point'
      },
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
  }
},{
    timestamps:true
  }
)
spaceSchema.index({location: '2dsphere'})
module.exports = model('Space', spaceSchema)