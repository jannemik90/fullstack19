import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = props.message

  if(message){
    return (
      <div style={style}>
        {props.message}
      </div>
    )
  }

  return(
    <div></div>
  )
  
}

const mapStateToProps = (state) => {
  return {
      message: state.message
  }
}



const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification


