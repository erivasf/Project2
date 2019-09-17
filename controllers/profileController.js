const User = require('../models/User')
const Profile = require('../models/Profile')
const Car = require('../models/Car');

exports.createProfile = (req, res) =>{
  res.render('create-profile');
}

exports.postProfile = async (req,res) =>{
  const {name} = req.body
  const {url: img} = req.file
  const { profile: profileId} = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {name,img})
  const {plateNumber, model, dimensions} = req.body
  const car = await Car.create({plateNumber,model,dimensions})

}

exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('profile')
  console.log(user)
  res.render('profile', user)
}
exports.editProfile = async (req, res) => {
  const {name} = req.body
  const {url: img} = req.file
  console.log(req.body)
  const { profile: profileId} = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {name,img})
  res.redirect('/profile')
}








