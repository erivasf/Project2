const Space = require('../models/Space');
const User = require('../models/User');

exports.createSpace = (req, res) => {
  res.render('create-space');
}

exports.postSpace = async (req, res, next) => {
  // const user = await User.findById(req.user.id)
  // console.log(user)
  console.log(req.body)
  const {address,lat,lng,dimensionsH,availability} = req.body
  const space = await Space.create({
    address,
    location: {
      type: "Point",
      coordinates : [lng, lat]
    },
    dimensions:dimensionsH,
    availability:{
      period:availability,
      interval:[00,23]
    }
  })
  console.log(space)
  res.send('ok')
}