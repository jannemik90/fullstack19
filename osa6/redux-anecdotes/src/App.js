import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'




const App = (props) => {

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AddAnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
