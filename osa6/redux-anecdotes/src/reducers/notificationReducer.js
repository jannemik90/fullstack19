

const notificationReducer = (state = null, action) => {
    switch( action.type ) {
        case 'SET_MESSAGE':
            return action.message
        case 'DELETE_MESSAGE':
            return null
        default:
                return state
    }
}

export const setMessage = (message, time) => {
    return async dispatch => {
        const timeToMs = time * 1000
        dispatch({
          type: 'SET_MESSAGE',
          message
        })
        setTimeout(() => {
            dispatch({
                type: 'DELETE_MESSAGE'
            })
          },timeToMs)
 }
}

export const deleteMessage = () => {
    return {type: 'DELETE_MESSAGE'}
}

export default notificationReducer