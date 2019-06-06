import React from 'react'

const BookRecomendations = (props) => {

    if (!props.show) {
        return null
      }

    const books = props.result.data.allBooks

    if(props.result.loading ){
        return(
            <p>Loading</p>
        )
    }

    console.log('recommendations', books)
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Here you can find your favorite books</p>
            <table>
            <tbody>
            {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
            </tbody>
            </table>
        </div>
    )
}

export default BookRecomendations