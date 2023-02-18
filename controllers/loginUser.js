const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

module.exports = (req, res) => {
  const { username, password } = req.body

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id
          res.redirect('/')
        } else {
          req.flash('loginErrors', ['Wrong email or password.'])
          req.flash('data', req.body)
          res.redirect('/auth/login')
        }
      })
    } else {
      req.flash('loginErrors', ['No user with the following credentials.'])
      req.flash('data', req.body)
      res.redirect('/auth/login')
    }
  })
}
