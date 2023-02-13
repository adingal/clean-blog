const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv')

// Global variable
global.loggedIn = null

// Controllers
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newPostController = require('./controllers/newPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

// Custom middleware
const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleWare = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

// Insert configuration into process.env
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

// Connect to local mongodb
// mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true })

// Connect to mongodb atlas online
mongoose.connect(DB, { useNewUrlParser: true })

// Initialize new express app
const app = new express()
// Set express to use ejs as templating engine
app.set('view engine', 'ejs')
app.set('views', __dirname)
// Serve static files in public folder
app.use(express.static('public'))
// Parse request to json
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
// For uploading images
app.use(fileUpload())
// Custom middleware
// app.use('/posts/store', validateMiddleWare)
// Register express session
app.use(expressSession({ secret: 'doggy doe' }))
// Register to global if user is logged in
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})
app.use(flash())

/* Routes
 *********************************/

// GET
app.get('/', homeController)
app.get('/post/new', authMiddleWare, newPostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

// POST
app.post(
  '/posts/store',
  authMiddleWare,
  validateMiddleWare,
  storePostController
)
app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware,
  storeUserController
)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

// 404 NOT FOUND
app.use((req, res) => {
  res.render('notfound')
})

app.listen(4000, () => console.log('App listening on port 4000'))
