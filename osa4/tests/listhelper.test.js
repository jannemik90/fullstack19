const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const blogWithoutLikes = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const emptyBlogList = []

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has blogs that have total 36 likes equals 36 likes', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })

    test('blog without likes equals 0', () => {
      const result = listHelper.totalLikes(blogWithoutLikes)
      expect(result).toBe(0)
    })

    test('list without blogs equals 0', () => {
      const result = listHelper.totalLikes(emptyBlogList)
      expect(result).toBe(0)
    })
  })

  describe('favorite blog', () => {

    test('favoriteblog equals to one with the most likes', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      })
    })

    test('with one blog returns that one', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      })
    })

  })

  describe('mostblogs', () => {

    test('find an author with the most blogs when multiple authors', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })

    test('find an author with the most blogs when only one author', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1
      })
    })

  })

  describe('mostlikes', () => {

    test('find an author with the most likes when multiple authors', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
    })

    test('find an author with the most likes when only one author', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

  })
