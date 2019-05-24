const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach( async () => {
    jest.setTimeout(10000);
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)    
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)        
})

test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('variable id is called id', async () => {
    await api
        const response = await api.get('/api/blogs')
        const body = response.body
        expect(body[0].id).toBeDefined()
})

test('is possible add a new blog', async () => {

    const newBlog = {
        title: "Test blog",
        author: "Test Author",
        url: "testiosoite",
        likes: 11
      }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/ )

      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)
      expect(response.body.length).toBe(helper.initialBlogs.length + 1)
      expect(titles).toContain(
          'Test blog'
      )
})

test('if likes is undefined it value should be 0', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Test Author",
        url: "testiosoite"
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/ )

      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length + 1)
      expect(response.body[helper.initialBlogs.length].likes).toBe(0)


})

test('if title or url is empty respond is 400', async () => {
    const newBlog = {
        author: "Test Author"
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('is possible delete one blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)

})

test('is possible update one blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 99999,
        __v: 0
      }

      await api
       .put(`/api/blogs/${newBlog._id}`)
       .send(newBlog)
       .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtStart.length).toBe(blogsAtEnd.length)
      
      const likes = blogsAtEnd.map(blog => blog.likes)
      expect(likes).toContain(99999)
})


test('username cant be empty', async () => {
    const newUser = {username: "", name:"Kalle", password:"fsafsass"}

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)  
        
        expect(result.body.error).toContain('`username` is required')

})

test('username must be longer than 3', async () => {
    const newUser = {username: "Ka", name:"Kalle", password:"fsafsass"}

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)    

        expect(result.body.error).toContain('is shorter than the minimum allowed length')

})

test('username must be unique', async () => {
    const newUser = {username: "Kalle", name:"Kalle", password:"fsafsass"}

        await api
        .post('/api/users')
        .send(newUser) 

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)   

        expect(result.body.error).toContain('`username` to be unique')

})

afterAll(() => {
    mongoose.connection.close()
})




