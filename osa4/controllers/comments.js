const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')


commentsRouter.post('/:id/comments', async(request, response, next) => {
    try {
        const body = request.body
        const id = request.params.id
        const blog = await Blog.findById(id)
        const comment = new Comment({
            text: body.text,
            blog: blog.id
        })

        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment)
        await blog.save()
        response.json(savedComment)
    } catch(exception){
        next(exception)
    }
})




module.exports = commentsRouter