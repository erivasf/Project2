const User = require('../models/User')
const Profile = require('../models/Profile')
const nodemailer = require('nodemailer');

exports.signupForm = (req, res) => {
  res.render('auth/signup')
}

exports.signup = async (req, res) => {
  const {email,password} = req.body
  console.log({email,password})
  //Token
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }
  const profile = await Profile.create({})
  User.register(new User({email, profile,confirmationCode:token}), password, function(err, account) {
    if (err) {
      return res.json(err)
    }
    return res.redirect('/auth/login')
  })
  
  //Send Email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  transporter.sendMail({
    from: `Park It <${process.env.EMAIL}>`,
    to: email,
    subject: 'Confirm your email address',
    text: `Confirma tu correo en: http://localhost:3001/auth/confirm/${token}`,
    html:`<p>Confirma tu correo en http://localhost:3001/auth/confirm/${token}</p>`
  })
  .then(info => console.log('Email sent success'))
  .catch(error => console.log(error))
}

exports.confirmEmail = async (req, res) => {
  const {confirmCode} = req.params
  const user = await User.findOneAndUpdate({ confirmationCode: confirmCode }, { $set: { status: "Active" } }, { new: true })
  .then((data) => {
    console.log('ok')
    res.render('auth/confirmation', data)
  })
  .catch(err => res.send(err))
};

exports.loginForm = (req, res) => {
  res.render('auth/login')
}

exports.login = async (req, res) => {
  const {_id: id} = req.user
  const user = await User.findById(id)
  console.log(user)
  if(user.profileStatus === 'Incomplete Profile'){
    res.redirect('/create-profile')
  }else{
    res.redirect('/')
  }
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/auth/login')
}
