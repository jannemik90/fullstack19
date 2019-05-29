import React from 'react'

const Notification = ({message, isErrorMessage}) =>{
    let notificationStyle = {
      backgroundColor: 'darkgreen',
      color: 'white',
      borderRadius: '20px',
      padding: '20px'
    }
    if(isErrorMessage){
      notificationStyle = {
        ...notificationStyle,
        backgroundColor: 'red'
      }
    }
  
    if(message === ''){
      return null
    }
    return(
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    )
  }

  export default Notification