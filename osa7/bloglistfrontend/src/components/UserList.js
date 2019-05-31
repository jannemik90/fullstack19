import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = ( props ) => {

  useEffect(() => {
    props.getAllUsers()
  }, [])


  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.usersInTable}
        </tbody>
      </table>
    </div>
  )
}

const usersToTable = (users) =>
  users.map(person =>
    <tr key={person.id}>
      <Link to={`/users/${person.id}`}>
        <td>{person.name}</td>
      </Link>
      <td>{person.blogs.length}</td>
    </tr>
  )



const mapStateToProps = (state) => {
  return {
    usersInTable: usersToTable(state.users),
    users: state.users
  }
}



const ConnectedUserList = connect(mapStateToProps, { getAllUsers })(UserList)

export default ConnectedUserList