import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdoteForm = ({store}) => {

    const addNewAnecdote = (event) => {
        event.preventDefault()
        console.log('value', event.target.anecdote.value)
        store.dispatch(addAnecdote(event.target.anecdote.value))
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

export default AddAnecdoteForm