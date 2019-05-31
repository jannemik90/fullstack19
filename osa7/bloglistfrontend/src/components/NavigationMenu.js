import React from 'react'
import { Link  } from 'react-router-dom'
import { removeUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'

const NavigationMenu = (props) => {

  const liStyle = {
    display: 'inline',
    alignConten: 'center',
    padding: '15px',
    backgroundColor: 'blue',
    color: 'white',
    margin: '15px'
  }

  const ulStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '20px',
    backgroundColor: 'lightblue'
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    props.removeUser()
  }

  return(
    <ul style={ulStyle}>
      <Link to='/' ><li style={liStyle}><a>Blogs</a></li></Link>
      <Link to='/users' ><li style={liStyle}><a>Users</a></li></Link>
      <li style={liStyle}>{props.user.name} logged in</li>
      <li style={liStyle}><button onClick={logout}>Logout</button></li>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  removeUser
}

const ConnectedNavigationMenu = connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)


export default ConnectedNavigationMenu