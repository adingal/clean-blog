module.exports = (req, res) => {
  let title = ''
  let body = ''
  const postData = req.flash('newPostData')[0]

  if (typeof postData != 'undefined') {
    title = postData.title
    body = postData.body
  }

  if (req.session.userId) {
    return res.render('create', {
      errors: req.flash('newPostErrors'),
      title,
      body,
    })
  }
  res.redirect('/auth/login')
}
