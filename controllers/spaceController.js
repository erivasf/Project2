const Space = require('../models/Space');
const User = require('../models/User');

exports.createSpace = (req, res) => {
  res.render('create-space');
}

exports.postSpace = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const {address,lat,lng,dimensionsH,availability} = req.body
  let startHour = 00
  let endHour = 24
  if(availability == 'SPECIFIC HOURS'){
    startHour = req.body.startHour
    endHour = req.body.endHour
  }
  const space = await Space.create({
    address,
    location: {
      type: "Point",
      coordinates : [lng, lat]
    },
    dimensions:dimensionsH,
    availability:{
      period:availability,
      interval:[startHour,endHour]
    }
  })
  user.space.push(space.id)
  user.save()
  res.redirect('/profile')
}

exports.placePage = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  console.log('USER: ' + user)
  const places = []
  console.log('placeS: ' + places)
  user.place.forEach(place => {
    let obj = Place.findById(place)
    places.push(obj)
  })
  console.log('placeS: ' + places)
  res.render('profile', {places})
exports.spaceDetail = async(req, res) =>{
  const {id} = req.params
  const space = await Space.findById(id)
  let image
  let size
  switch (space.dimensions) {
    case 'S':
      image = '/images/carSmall.png'
      size = 'Small'
      break;
    case 'M':
      image = '/images/carMedium.png'
      size =  'Medium'
      break;
    case 'L':
      image = '/images/carLarge.png'
      size = 'Large'
      break;
  }
  let context = {space, image, size} 
  res.render('space-detail', context)
}