const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).populate('userId')
  res.render('post', {
    blogpost,
  })
}
