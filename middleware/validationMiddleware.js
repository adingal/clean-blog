module.exports = (req, res, next) => {
  const errors = []

  if (req.files == null) {
    errors.push('Image is required.')
  }

  if (req.body.title == '') {
    errors.push('Title is required.')
  }

  if (req.body.body == '') {
    errors.push('Description is required.')
  }

  if (errors.length > 0) {
    req.flash('newPostErrors', errors)
    req.flash('newPostData', req.body)
    res.redirect('/post/new')
  }

  next()
}
