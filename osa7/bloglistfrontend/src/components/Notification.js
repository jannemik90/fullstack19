import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let notificationStyle = {
    backgroundColor: 'darkgreen',
    color: 'white',
    borderRadius: '20px',
    padding: '20px'
  }
  if(props.notification.alert){
    notificationStyle = {
      ...notificationStyle,
      backgroundColor: 'red'
    }
  }

  if(props.notification.message === ''){
    return null
  }
  return(
    <div style={notificationStyle}>
      <p>{props.notification.message}</p>
    </div>
  )
}

const mapStatetToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification= connect(mapStatetToProps)(Notification)

export default ConnectedNotification