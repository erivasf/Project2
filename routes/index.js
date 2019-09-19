const router = require('express').Router()
<<<<<<< HEAD
const {showProfile,editProfile,postProfile,createProfile,createBoth,postBoth} = require('../controllers/profileController')
const {createCar, postCar, carPage} = require('../controllers/carController')
const {createSpace, postSpace, spacePage} = require('../controllers/spaceController')
=======
const {showProfile,editProfile,postProfile,createProfile,createCar,createBoth,postCar,postBoth} = require('../controllers/profileController')
const {createSpace, postSpace, spaceDetail} = require('../controllers/spaceController')
>>>>>>> ddc59b35e29d4fceb681a67bce3a0e9255cd19df
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')
const Space = require('../models/Space')

/* GET home page */
router.get('/', async (req, res, next) => {
  const spaces = await Space.find()
  res.render('index', {spaces})
})

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile, spacePage))
router.post('/profile', isLoggedIn('/auth/login'), uploadCloud.single('photo'), catchErrors(editProfile))
router.get('/create-car', isLoggedIn('/auth/login'), catchErrors(createCar))
router.post('/create-car', isLoggedIn('/auth/login'), catchErrors(postCar))
router.get('/create-both', isLoggedIn('/auth/login'), catchErrors(createBoth))
router.post('/create-both', isLoggedIn('/auth/login'), catchErrors(postBoth))
router.get('/create-space',createSpace)
router.post('/create-space', catchErrors(postSpace))
router.get('/space-detail/:id', spaceDetail)

module.exports = router
