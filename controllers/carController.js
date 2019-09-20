const Car = require('../models/Car');
const User = require('../models/User');

exports.createCar = async (req, res) => {
  res.render('create-car')
}

exports.postCar = async (req, res) => {
  const user = await User.findById(req.user.id)
  const {
    plateNumber,
    model,
    color,
    dimensionsW
  } = req.body
  const car = await Car.create({
    plateNumber,
    model,
    color,
    dimensions: dimensionsW
  })
  user.car.push(car.id)
  user.save()
  res.redirect('/profile')
}

exports.updateCar = async (req, res)=> {
  const {id} = req.params
  const{plateNumber, model, color, dimensionsW} = req.body
  await Car.findByIdAndUpdate(id, {plateNumber, model, color, dimensions:dimensionsW})
  res.redirect('/profile')
}

exports.deleteCar = async (req, res) => {
  const {id} = req.params
  await Car.findByIdAndDelete(id)
  res.redirect('/profile')
}
