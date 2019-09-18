const router = require('express').Router()
const {showProfile,editProfile, createProfile, postProfile, createCar, createBoth, postCar, postBoth} = require('../controllers/profileController')
const {createSpace, postSpace} = require('../controllers/spaceController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile))
router.get('/create-profile',createProfile)
router.post('/create-profile',uploadCloud.single('photo'),catchErrors(postProfile))
router.get('/create-car', isLoggedIn('/auth/login'), catchErrors(createCar))
router.post('/create-car', isLoggedIn('/auth/login'), catchErrors(postCar))
router.get('/create-both', isLoggedIn('/auth/login'), catchErrors(createBoth))
router.post('/create-both', isLoggedIn('/auth/login'), catchErrors(postBoth))
router.get('/create-space',createSpace)
router.post('/create-space', catchErrors(postSpace))

module.exports = router
