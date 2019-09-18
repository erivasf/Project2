const User = require('../models/User')
const Profile = require('../models/Profile')
const Car = require('../models/Car');
const Space = require('../models/Space')

exports.createProfile = (req, res) =>{
  res.render('create-profile');
}

exports.postProfile = async (req,res) =>{
  console.log(req.body)
  const {name, plateNumber, model, lng, lat, dimensionsW, dimensionsH, address} = req.body
  const {url: img} = req.file
  console.log("UUUSEEEEERRRRRR" + req.user)
  const {_id: id} = req.user
  console.log(id)
  const user = await User.findById(id)
  console.log("UUUSEEEEERRRRRR Profile")
  console.log(use.profile)
  const {profile: profileId} = await User.findById(id)
  await Profile.findByIdAndUpdate(profileId, {name,img})

  const car =  Car.create({
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

  const space = Space.create({
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








