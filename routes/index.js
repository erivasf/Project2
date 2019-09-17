const express = require('express')
const {showProfile,editProfile, createProfile} = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile))
router.get('/create-profile',createProfile)
router.post('/edit-profile',uploadCloud.single('photo'),catchErrors(editProfile))

module.exports = router
