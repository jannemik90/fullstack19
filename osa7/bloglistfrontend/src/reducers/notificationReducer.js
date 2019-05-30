const initialState = {
  message: '',
  alert: 'false'
}

const notificationReducer = (state = initialState, action) => {
  switch ( action.type ){
  case 'SET_MESSAGE':
    return action.content
  case 'RESET_MESSAGE':
    return initialState
  default:
    return state
  }
}

export const addMessage = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, 5000)
  }

}


export default notificationReducer