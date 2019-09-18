const express = require('express')
const {showProfile,editProfile, createProfile, postProfile} = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/profile/:id', isLoggedIn('/auth/login'), catchErrors(showProfile))
router.get('/create-profile',createProfile)
router.post('/create-profile',uploadCloud.single('photo'),catchErrors(postProfile))

module.exports = router
