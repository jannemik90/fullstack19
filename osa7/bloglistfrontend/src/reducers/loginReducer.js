


const loginReducer = (state = null, action ) => {
  switch( action.type ) {
  case 'ADD_USER':
    return action.user
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const addUser = (user) => {
  return { type: 'ADD_USER', user }
}

export const removeUser = () => {
  return { type: 'REMOVE_USER' }
}

export default loginReducer