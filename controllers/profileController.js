const User = require('../models/User')
const Profile = require('../models/Profile')
const Car = require('../models/Car');
const Space = require('../models/Space')

exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('profile')
  console.log(user)
  res.render('profile', user)
}

// exports.postProfile = async (req, res) => {
//   console.log('PARAMS: ' +  req.params)
//   const id = req.user._id
//   const user = await User.findById(id)
//   const {photo, name} = req.body
//   await Profile.findByIdAndUpdate(user.profile, {name, photo})
// }

exports.editProfile = async (req, res) => {
  const {name} = req.body
  const {url: img} = req.file
  console.log(req.body)
  const { profile: profileId} = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {name,img})
  res.redirect('/profile')
}

exports.createCar = async (req, res) => {
  res.render('create-car')
}

exports.createBoth = async (req, res) => {
  res.render('create-both')
}

exports.postCar = async (req, res) => {
  const user = await User.findById(req.user.id)
 const {plateNumber,model, color, dimensionsW} = req.body
 const car = await Car.create({plateNumber,model,color,dimensions:dimensionsW})
   user.car = car.id
   user.save()
   res.redirect('/profile')
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
  user.space = space.id
  user.car = car.id
  user.save()

  res.redirect('/profile')  
}