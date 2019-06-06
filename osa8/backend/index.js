const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub} = require('apollo-server')
require('dotenv').config()

const pubSub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI
console.log('commecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

type Subscription {
  bookAdded: Book!
} 

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      findBooksByAuthor(name: String!): Int!
      me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }



`

const resolvers = {


  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let foundedBooks =  await Book.find({}).populate('author')
        console.log('founded', foundedBooks)
        if(args.author){
          foundedBooks = foundedBooks.filter(b => b.author === args.author)
        }
        if(args.genre){
          foundedBooks = foundedBooks.filter(b => b.genres.includes(args.genre))
        }
        return foundedBooks
      },
      allAuthors: () => Author.find({}),
      me: ( root, args, context ) => {
        return context.currentUser
      }
  },
  Author: {
      bookCount: async (root) => root.books.length
  },
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        id: root.author.id,
        born: root.author.born,
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log('Lisätään')
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AutheticationError("not authenticated")
      }
      let author = await Author.findOne({ name: args.author})
      if(!author){
       newAuthor = new Author({name: args.author})
       try {
        await newAuthor.save()
       } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
       }
       author = await Author.findOne({ name: args.author})
      }
      const book = new Book({ title: args.title, author: author.id,  published: args.published, genres: args.genres})
      console.log('Book', book)
      try {
        console.log('Tallennetaan')
        const savedBook = await book.save()
        console.log('savedBook', savedBook)
        author.books.push(savedBook.id)
        console.log('author', author)
        await author.save()
        console.log('Tallennettu', savedBook)
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
       }

      pubSub.publish('BOOK_ADDED', {bookAdded: book})
       
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      console.log('Funktiossa')
      if(!currentUser) {
        throw new AutheticationError("not authenticated")
      }
      const foundedAuthor = await Author.findOne({name: args.name})
      if(!foundedAuthor){
        return null
      }
      foundedAuthor.born = args.setBornTo
      try{
        await foundedAuthor.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
       }
      return foundedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})

      if(! user || args.password !== 'salasana') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        usename: user.username,
        id: user.id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    },
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if( auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

