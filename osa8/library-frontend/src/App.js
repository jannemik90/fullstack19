import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks';
import { useMutation  } from 'react-apollo-hooks';



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
{
  allBooks {
    author
    title
    published
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


const App = () => {
  const [page, setPage] = useState('authors')

  const addBook = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  const updateAuthor = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={resultAuthors}
        updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'}
        result={resultBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
