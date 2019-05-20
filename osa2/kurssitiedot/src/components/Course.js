import React from 'react'


const Course = ({course}) => {
    return(
        <div>   
            <Header text={course.name } />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )

}



const Header = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Content = ({parts}) => {  
    const rows = parts.map(part => 
    <Part key={part.id} part={part.name} exercises={part.exercises} />)
    return(
        <div>
            {rows}
        </div>
    )
}

const Part = ({part,exercises}) => {
    return (
        <div>
            <p>{part} {exercises}</p>
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return (
        <div>
            <p>
                Yhteensä {total}
            </p>
        </div>
    )
}

export default Course