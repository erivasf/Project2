const {Schema, model} = require('mongoose')
const rsvSchema = new Schema ({
  day: String, 
  starts: String, 
  ends: String
})
module.exports = model('Rsv', rsvSchema)