import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AddAnecdoteForm = (props) => {

    const addNewAnecdote = (event) => {
        event.preventDefault()
        console.log('value', event.target.anecdote.value)
        props.addAnecdote(event.target.anecdote.value)
    }

    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={addNewAnecdote}>
                <input name='anecdote' />
                <button type='submit'>Lisää</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote
  }
  
  const ConnectedAddAnecdoteForm = connect(null, mapDispatchToProps)(AddAnecdoteForm)
  
  export default ConnectedAddAnecdoteForm