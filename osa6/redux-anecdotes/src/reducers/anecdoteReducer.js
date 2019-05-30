import anecdoteService from '../services/anecdotes'



const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE' :
      const id = action.data.id
      const anecdateToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdateToChange,
         votes: anecdateToChange.votes + 1
        }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)  
    case 'ADD_ANECDOTE' :
      return state.concat(action.data)
    case 'INIT_ANECDOTES' :
      return action.data
    default:
    return state      
  }
}

export const addAnecdote = (content) =>{
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const savedAnecdote = await anecdoteService.update(newAnecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data:  {id: savedAnecdote.id}
    })
  }
}

export default reducer