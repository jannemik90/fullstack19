const initialState = 'This is notification!'

const notificationReducer = (state = initialState, action) => {
    switch( action.type ) {
        case 'SET_MESSAGE':
            return action.message
        case 'DELETE_MESSAGE':
            return null
        default:
                return state
    }
}

export const setMessage = (message) => {
    return { type: 'SET_MESSAGE', message}
}

export const deleteMessage = () => {
    return {type: 'DELETE_MESSAGE'}
}

export default notificationReducer