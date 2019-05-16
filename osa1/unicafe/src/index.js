import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({tittle}) => {
    return(
        <h2>{tittle}</h2>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const yhteensä = good + bad + neutral
    const keskiarvo = (good * 1 + neutral * 0 + bad * -1) / yhteensä
    const positiivisia = good / yhteensä * 100 + '%'

    if(yhteensä === 0){
        return(
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }

    return(
       <table> 
        <tbody>
            <Statistic text="hyvä" value={good} />
            <Statistic text="neutraali" value={neutral} />
            <Statistic text="huono" value={bad} />

            <Statistic text="yhteensä" value={yhteensä} />
            <Statistic text="keskiarvo" value={keskiarvo} />
            <Statistic text="positiivisia" value={positiivisia}/>
        </tbody>
      </table>
      )
}

const Statistic = ({text, value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({clickHandler, text}) => {
    return(
        <button onClick={clickHandler}>{text}</button>
    ) 
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good +1)
  const handleNeutralClick = () => setNeutral(neutral +1)
  const handleBadClick = () => setBad(bad +1)    
  return (
    <div>
      <Header tittle="Anna palautetta" />

      <Button clickHandler={handleGoodClick} text="hyvä" />
      <Button clickHandler={handleNeutralClick} text="neutraali" />
      <Button clickHandler={handleBadClick} text="huono" />

      <Header tittle="Statistiikka" />
      <Statistics good={good} neutral={neutral} bad={bad} />          
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)