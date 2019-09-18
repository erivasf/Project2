const User = require('../models/User')
const Profile = require('../models/Profile')
const Car = require('../models/Car');
const Space = require('../models/Space')

exports.createProfile = async (req, res) =>{
  const {id} = req.params
  const user = await User.findById(id)
  res.render('create-profile', {user});
}

exports.postProfile = async (req, res) => {
  const id = req.user._id
  const user = await User.findById(id)
  console.log(user)
  // const {profile: profileId} = await User.findById(id)

  const {name, plateNumber,model,lng,lat,dimensionsW,dimensionsH,address} = req.body
  const {url: img} = req.file

  await Profile.findByIdAndUpdate(user.profile, {name,img})

  const car =  await Car.create({
    plateNumber,
    model,
    dimensions:dimensionsW
  })
  .then((result) => {
    console.log('Car created')
    user.car = car.id
  }).catch((err) => {
    console.log(err)
  });

  const space = await Space.create({
    address,
    location: {
      type: "Point",
      coordinates : [lng, lat]
    },
    dimensions:dimensionsH
  })
  .then((result) => {
    console.log('Car created')
    user.space = space.id
  }).catch((err) => {
    console.log(err)
  });

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








