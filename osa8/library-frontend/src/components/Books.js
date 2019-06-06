import React from 'react'



const Books = (props) => {
  if (!props.show) {
    return null
  }


  const books = props.result.data.allBooks
  console.log('Books', books)
  if( props.result.loading || props.genres.loading){
    return <div>Loading...</div>
  }
 
  
  const genres = [...new Set( props.genres.data.allBooks.map(b => b.genres).flat())]


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => 
        <button key={g} onClick={() => props.setGenre(g)}>{g}</button>
        )}
        <button key={'all'} onClick={() => props.setGenre('')}>All</button>
    </div>
  )
}

export default Books