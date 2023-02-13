module.exports = (req, res) => {
  let username = ''
  let password = ''
  const data = req.flash('data')[0]

  if (typeof data != 'undefined') {
    username = data.username
    password = data.password
  }

  res.render('login', {
    // Retrieve errors from flash
    errors: req.flash('loginErrors'),
    username: username,
    password: password,
  })
}
