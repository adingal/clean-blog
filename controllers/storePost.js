const path = require('path')
const BlogPost = require('../models/BlogPost')

module.exports = (req, res) => {
  if (req.files && req.files.image) {
    let image = req.files.image
    image.mv(
      path.resolve(__dirname, '..', 'public/img', image.name),
      async (err) => {
        const blogpost = await BlogPost.create({
          ...req.body,
          image: `/img/${image.name}`,
          userId: req.session.userId,
        })
        res.redirect('/')
      }
    )
  }
}
