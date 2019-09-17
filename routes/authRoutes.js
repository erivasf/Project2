const router = require('express').Router()
const {
  signupForm,
  signup,
  loginForm,
  login,
  logout,
  confirmEmail
} = require('../controllers/authController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedOut = require('../middlewares/isLoggedOut')
const passport = require('../config/passport')


router.get('/signup', isLoggedOut('/'), signupForm)
router.post('/signup', catchErrors(signup))
router.get('/login', isLoggedOut('/'), loginForm)
router.post('/login', passport.authenticate('local'), login)
router.get('/logout', logout)
router.get('/confirm/:confirmCode', confirmEmail)

module.exports = router
