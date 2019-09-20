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
    enum: ['HAVE', 'WANT', 'BOTH']
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
  space: [{
  ref: 'Space',
  type: Schema.Types.ObjectId
}], 
  car: [{
    ref: 'Car', 
    type: Schema.Types.ObjectId
  }],
  profileStatus: {
    type: String, 
    enum:['Complete Profile', 'Incomplete Profile'], 
    default: 'Incomplete Profile'
  }
  , 
 rsv: {
    ref: 'Rsv',
    type: Schema.Types.ObjectId
  }
},
 {
  timestamps: true
})

userSchema.plugin(plm, {usernameField: 'email'})

module.exports = model('User', userSchema)
