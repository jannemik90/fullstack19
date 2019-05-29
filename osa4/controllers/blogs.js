const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', {username: 1, name: 1})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })
  
  blogRouter.post('/', async (request, response, next) => {
    
    const token = request.token
    try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
      }

      console.log('DecodedToken', decodedToken)
    const user = await User.findById(decodedToken.id)
    const blog = new Blog(request.body)
    blog.user = user._id

  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
   } catch(exception) {
     next(exception)
   }
  })

  blogRouter.put('/:id', async (request, response, next) =>{
    const blog = new Blog(request.body)
    const id = request.params.id
    const newBlog = {likes: blog.likes}
    console.log(id)
    console.log(request.body)
    try{
       const updated = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
       response.json(updated.toJSON())
    } catch(exception) {
      next(exception)
    }
  })



  blogRouter.delete('/:id', async(request, response, next) =>{
    const id = request.params.id
    console.log(id)
    const token = request.token
    try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
      }
      const blog = await Blog.findById(id)
      if(!(blog.user.toString() === decodedToken.id)){
        return response.status(401).json({ error: 'invalid token for this blog'})
      }
      const removedBlog = await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }
  })

  module.exports = blogRouter