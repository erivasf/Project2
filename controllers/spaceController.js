const Space = require('../models/Space');
const User = require('../models/User');

exports.createSpace = (req, res) => {
  res.render('create-space');
}

exports.postSpace = (req, res, next) => {
  const {address,lat,lng,dimensions,availability} = req.body
  
  res.send('ok')
}