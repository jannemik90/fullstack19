import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {  
    const parts = props.parts
    return(
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[2].name} exercises={parts[2].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Total = (props) => {
    const parts = props.parts
    return (
        <div>
            <p>
                Yhteensä {parts[0].exercises + parts[1].exercises + parts[2].exercises}
            </p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }
    return (
    <>
      <Header course={course.name} />  
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
