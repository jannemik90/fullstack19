import React from 'react';
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'



const App = ({store}) => {
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AddAnecdoteForm />
    </div>
  )
}

export default App
