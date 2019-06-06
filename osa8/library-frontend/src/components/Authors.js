import React from 'react'
import AddBornForm from './AddBornForm'

const Authors = (props) => {
  
  if (!props.show) {
    return null
  }
  const authors = props.result.data.allAuthors
  console.log('Authors', authors)
  if( props.result.loading ){
    return <div>Loading...</div>
  }

  const editAuthorsForm = props.loggedIn
  ? <AddBornForm authors={authors} updateAuthor={props.updateAuthor}/>
  : null  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {editAuthorsForm}
    </div>
  )
}

export default Authors