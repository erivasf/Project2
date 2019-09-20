const router = require('express').Router()
const {showProfile,editProfile,postProfile,createProfile,createBoth,postBoth} = require('../controllers/profileController')
const {createCar, postCar, carPage, updateCar, deleteCar} = require('../controllers/carController')
const {createSpace, postSpace, spacePage, spaceDetail, updateSpace, deleteSpace} = require('../controllers/spaceController')
const {createRsv} = require('../controllers/rsvController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')
const Space = require('../models/Space')

/* GET home page */
router.get('/', isLoggedIn('/auth/login'),async (req, res, next) => {
  const spaces = await Space.find()
  res.render('index', {spaces})
})

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile, spacePage))
router.post('/profile', isLoggedIn('/auth/login'), uploadCloud.single('photo'), catchErrors(editProfile))
router.get('/create-car', isLoggedIn('/auth/login'), catchErrors(createCar))
router.post('/create-car', isLoggedIn('/auth/login'), catchErrors(postCar))
router.post('/update-car/:id', isLoggedIn('/auth/login'), catchErrors(updateCar))
router.get('/delete-car/:id', isLoggedIn('/auth/login'), catchErrors(deleteCar))
router.get('/create-both', isLoggedIn('/auth/login'), catchErrors(createBoth))
router.post('/create-both', isLoggedIn('/auth/login'), catchErrors(postBoth))
router.get('/create-space', isLoggedIn('/auth/login'), createSpace)
router.post('/create-space', isLoggedIn('/auth/login'), catchErrors(postSpace))
router.post('/update-space/:id', isLoggedIn('/auth/login'), catchErrors(updateSpace))
router.get('/delete-space/:id', isLoggedIn('/auth/login'), catchErrors(deleteSpace))
router.get('/space-detail/:id',isLoggedIn('/auth/login'), spaceDetail)
router.post('/create-rsv/:id', isLoggedIn('/auth/login'),createRsv)

module.exports = router
