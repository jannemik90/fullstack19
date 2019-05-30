import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessage, deleteMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = (anecdote ,message ) => {
        props.addVote(anecdote)
        props.setMessage(message, 5)
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
                    <button onClick={() => vote(anecdote, `You voted '${anecdote.content}'`)}>vote</button>
                </div>
                </div>
            )}
        </div>   
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    console.log('show anecdotes', anecdotes)
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