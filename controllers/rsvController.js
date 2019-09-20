const Rsv = require('../models/Rsv')
const User = require('../models/User')
const Space = require('../models/Space')

exports.createRsv = async(req, res) => {
  console.log(req.body)
  console.log(req.params)
  const userId = req.user.id
  const {id} = req.params
  const user = await User.findById(userId)
  const space = await Space.findById(id)
  console.log(user)
  console.log(space)
  const {rsvDate, startTime, endTime} = req.body

  const rsv = await Rsv.create({
    day:rsvDate,
    starts: startTime,
    ends: endTime
  })

  user.rsv.push(rsv.id)
  user.save()
  res.redirect('/profile')
}