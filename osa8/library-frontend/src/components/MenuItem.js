import React from 'react'

const MenuItem = (props) => {
    if(!props.show){
        return null
    }

    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}

export default MenuItem