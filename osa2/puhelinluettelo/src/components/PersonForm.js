import React from 'react'

const PersonForm = ({formOnSubmit, nameValue, nameHandler, numberValue, numberHandler}) => {
    return(
        <form onSubmit={formOnSubmit}>
        <div>
          <p>nimi:</p> 
          <input 
          value={nameValue} 
          onChange={nameHandler}
          />
        </div>
        <div>
          <p>numero:</p> 
          <input 
          value={numberValue} 
          onChange={numberHandler}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}

export default PersonForm