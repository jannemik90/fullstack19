import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

const VotesDisplay = ({votes}) =>{
  return(
  <p>Has {votes} votes </p>
  )
}

const DisplayAnecdote =({anecdote}) => <p>{anecdote}</p>

const Header = ({text}) => <h2>{text}</h2>


const App = ({anecdotes, pointsList}) => {
  const [points, setPoints] = useState(pointsList)
  const [selected, setSelected] = useState(0)


  

  const randomNumber = () => {
     setSelected(Math.floor(Math.random() * anecdotes.length))
    }
  


  const [mostVoted, maxValue] = Object.entries(points)
    .reduce((accumulatingValue, currentValue) => currentValue[1] > accumulatingValue[1] ? currentValue : accumulatingValue)


  const addVote = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
  }
 
 




  return (
    <div>
      <Header text="Anecdote of the day" />
      <DisplayAnecdote anecdote={anecdotes[selected]} />
      <VotesDisplay votes={points[selected]} />
      <Button clickHandler={randomNumber} text="Next Anecdote" />
      <Button clickHandler={addVote} text="Vote" />
      <Header text="Anecdote with most votes" />
      <DisplayAnecdote anecdote={anecdotes[mostVoted]} />
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const pointsList = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} pointsList={pointsList} />,
  document.getElementById('root')
)