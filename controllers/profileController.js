const User = require('../models/User')
const Profile = require('../models/Profile')
const Car = require('../models/Car');
const Space = require('../models/Space')
const Rsv = require('../models/Rsv')

exports.showProfile = async (req, res) => {
  
  const user = await User.findById(req.user.id).populate('profile').populate('car').populate('space').populate('rsv')
  rsvs = user.rsv
  cars = user.car
  spaces = user.space
  res.render('profile', {user,cars, spaces, rsvs})
}

exports.editProfile = async (req, res) => {
  const {name} = req.body
  const {url: img} = req.file
  const { profile: profileId} = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {name,img})
  res.redirect('/profile')
}

exports.createBoth = async (req, res) => {
  res.render('create-both')
}

exports.postBoth = async (req, res) => {
   const user = await User.findById(req.user.id)
  const {name,plateNumber,model,color,lng,lat,dimensionsW,dimensionsH, address} = req.body
  const car = await Car.create({plateNumber,model,color,dimensionsW})
  let startHour = 00
  let endHour = 24
  if (availability == 'SPECIFIC HOURS') {
    startHour = req.body.startHour
    endHour = req.body.endHour
  }
  const space = await Space.create({
    address,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    dimensions: dimensionsH,
    availability: {
      period: availability,
      interval: [startHour, endHour]
    }
  })
  user.space.push(space.id)
  user.car.push(car.id)
  user.save()

  res.redirect('/profile')  
}