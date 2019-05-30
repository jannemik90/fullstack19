import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessage, deleteMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = (id, message) => {
        props.addVote(id)
        props.setMessage(message)
        setTimeout(() => props.deleteMessage(), 5000)
      }
      
    return(
        <div>
        <h2>Anecdotes</h2>
            {props.sortedAmdFilteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, `You voted '${anecdote.content}'`)}>vote</button>
                </div>
                </div>
            )}
        </div>   
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b ) => b.votes - a.votes)
        
}

const mapStateToProps = (state) => {
    return {
        sortedAmdFilteredAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    addVote,
    setMessage,
    deleteMessage
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList