import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch( action.type ) {
  case 'GET_ALL_USERS' :
    return action.users
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      users
    })
  }
}


export default usersReducer