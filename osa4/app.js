const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })
 .then(() =>  {
     console.log('MongoDB connected to ulr', mongoUrl)
 })
 .catch((error) => {
     console.log('MongoDB connection error', error.message)
 })


app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentsRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/tests')
    app.use('/api/testing', testRouter)
  }

app.use(middleware.errorHandler)

module.exports = app