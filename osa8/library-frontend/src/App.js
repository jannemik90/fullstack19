import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BookRecomendations from './components/BookRecomendations'
import LoginForm from './components/LoginForm'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks';
import { useMutation, useApolloClient   } from 'react-apollo-hooks';
import MenuItem from './components/MenuItem'
import { Subscription} from 'react-apollo'


const BOOK_ADDED = gql`
subscription{
  bookAdded{
    title
    published
    genres
  }
}
`


const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
    }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query allBooks($genre: String!, $author: String!){
  allBooks(genre: $genre, author: $author) {
    title
    published
    genres
    author {
      name
      born
    }
  }
}
`

const UPDATE_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ){
    name
  }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const ME = gql`
{
  me{
    username
    favoriteGenre
  }
}
`
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState('')
  const user = useQuery(ME).data.me
  const currentUser = user ? user : {name:'', favoriteGenre:'ei valittu genreä'}
  console.log('User', currentUser)
  console.log('Genre', genre)
  const addBook = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS, variables:{genre, author: ''}},
      { query: ALL_BOOKS, variables:{genre: currentUser.favoriteGenre , author: ''}},
    ]
  })
  const updateAuthor = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS      }]
  })
  const login = useMutation(LOGIN)

  const resultBooks = useQuery(ALL_BOOKS, {
    variables: {genre, author: ''}
  })

  const resultRecommendedBooks = useQuery(ALL_BOOKS, {
    variables: {genre: currentUser.favoriteGenre, author: ''}
  })
  
  const booksForGenres = useQuery(ALL_BOOKS, {
    variables: {genre: '', author: ''}
  })

  const resultAuthors = useQuery(ALL_AUTHORS)
  

  const client = useApolloClient()

  console.log('token',token)


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div>
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({subscriptionData}) => {
          const addedBook = subscriptionData.data.bookAdded
          window.alert(`Lisätty kirja ${addedBook.title}`)
          
        }}
      >
        {() => null}
      </Subscription>


      <div>
        <MenuItem show={true} text='Authors' onClick={() => setPage('authors')}/>
        <MenuItem show={true} text='Books' onClick={() => setPage('books')}/>
        <MenuItem show={token} text='Book recommendations' onClick={() => setPage('recommendations')}/>
        <MenuItem show={!token} text='Login' onClick={() => setPage('login')}/>
        <MenuItem show={token} text='Add new blog' onClick={() => setPage('add')}/> 
        <MenuItem show={token} text=' Log out' onClick={() => logout()}/> 
      </div>

      <Authors
        loggedIn={token}
        show={page === 'authors'}
        result={resultAuthors}
        updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'}
        result={resultBooks}
        setGenre={(genre) => setGenre(genre)}
        genres={booksForGenres}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm 
      show={page === 'login'}
      login={login}
      setToken={(token) => setToken(token)}
      redirect={() =>setPage('authors')}
      />

      <BookRecomendations
      show={page === 'recommendations'}
      result={resultRecommendedBooks}
      />

    </div>
  )
}

export default App
