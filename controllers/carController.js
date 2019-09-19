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



// exports.carPage = async (req, res, next) => {
//   console.log(">>>>>", req.user)
//   const user = await User.findById(req.user.id)
//   console.log('USER: ' + user)
//   const cars = []
//   console.log('CARS: ' + cars)
//   user.car.forEach(elCar=> {
//     let obj = Car.findById(elCar)
//     cars.push(obj)
//   })
//   console.log('CARS: ' + cars)
//   res.render('profile', {cars})
// }