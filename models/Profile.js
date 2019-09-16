const {Schema, model} = require('mongoose')

const profileSchema = new Schema({
  name: String,
  img: {
    type: String,
    default: 'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320166578424287581.png'
  }
}, {
  timestamps:true
})

module.exports = model('Profile', profileSchema)
