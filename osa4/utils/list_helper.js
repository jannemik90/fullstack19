var _ = require('lodash');


const blogs = [
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
      },  
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
    }

  ]
  

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesSum = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return likesSum
}

const favoriteBlog = (blogs) => {
    let favorite = null
    let mostLikes = 0

    blogs.forEach(blog => {
        if(blog.likes >= mostLikes){
            favorite = blog
            mostLikes = blog.likes
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    const countedBlogs = _.countBy(blogs, 'author')
    let authorName = ''
    let authorBlogs = 0
    Object.keys(countedBlogs).forEach(author => {
        if(countedBlogs[author] >= authorBlogs){
            authorName = author
            authorBlogs = countedBlogs[author]
        }
    })
    const favoriteAuthor = {}
    favoriteAuthor.author = authorName
    favoriteAuthor.blogs = authorBlogs
    return favoriteAuthor
}


const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')
    
    let blogLikes = 0
    let authorName = 0

    Object.keys(blogsByAuthor).forEach(author => {
        let likes = 0
        blogsByAuthor[author].forEach(blog => {
            likes += blog.likes
        })
        if(likes >= blogLikes){
            blogLikes = likes
            authorName = author
        }
    })
    
    const author = {}
    author.author = authorName
    author.likes = blogLikes

    return author

}

console.log(mostLikes(blogs))


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

