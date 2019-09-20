const Rsv = require('../models/Rsv')
const User = require('../models/User')
const Space = require('../models/Space')

exports.createRsv = async(req, res) => {
  const userId = req.user.id
  const {id} = req.params
  const user = await User.findById(userId)
  const space = await Space.findById(id)
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

exports.cancelRsv = async (req, res) => {
  const {id} = req.params
  await Rsv.findByIdAndDelete(id)
  res.redirect('/profile')
}