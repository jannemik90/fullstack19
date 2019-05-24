const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })
  
  blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
   try{
    await blog.save()
    response.json(blog.toJSON())
   } catch(exception) {
     next(exception)
   }
  })

  blogRouter.put('/:id', async (request, response, next) =>{
    const blog = new Blog(request.body)
    const id = request.params.id
    const newBlog = {likes: blog.likes}
    console.log(id)
    try{
       await Blog.findByIdAndUpdate(id, newBlog, { new: true })
       response.json(blog.toJSON())
    } catch(exception) {
      next(exception)
    }
  })



  blogRouter.delete('/:id', async(request, response, next) =>{
    const id = request.params.id
    console.log(id)
    try{
      const removedBlog = await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }
  })

  module.exports = blogRouter