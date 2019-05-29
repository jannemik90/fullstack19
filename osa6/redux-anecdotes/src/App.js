import React from 'react';
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { addVote } from './reducers/anecdoteReducer'

const App = ({store}) => {
  
  return (
    <div>
      <AnecdoteList store={store} />
      <AddAnecdoteForm store={store} />
    </div>
  )
}

export default App
