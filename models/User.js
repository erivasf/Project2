const {Schema,model} = require('mongoose')
const plm = require('passport-local-mongoose')

const userSchema = new Schema({
  email: {
    type:String, 
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['P1', 'P2']
  },
  profile: {
    ref: 'Profile',
    type: Schema.Types.ObjectId
  },
  status: {
    type: String,
    enum: ['Pending Confirmation', 'Active'],
    default:'Pending Confirmation'
  },
  confirmationCode:{
    type: String,
    unique:true
  },
}, {
  timestamps: true
})

userSchema.plugin(plm, {usernameField: 'email'})

module.exports = model('User', userSchema)
