const {Schema,model} = require('Mongoose')
const commentSchema = new Schema({
  content: String, 
  author: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true
  }
)
module.exports = model('Comment', commentSchema)