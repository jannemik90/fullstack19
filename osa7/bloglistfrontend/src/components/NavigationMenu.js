import React from 'react'
import { Link  } from 'react-router-dom'
import { removeUser } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import styled from 'styled-components'

const NavigationMenu = (props) => {

  if( props.user === null)
    return null


  const NavigationItem = styled.li`
  display: inline;
  align-content: center;
  padding: 15px;
  color: white;
  margin: 15px;
  `

  const NavigationBar =styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 20px;
    background: #04809f;
  `

  const CancelButton = styled.button`
    background: white;
    padding: 10px;
    border: 1px solid #fe3761;
    color: #fe3761;
    `

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    props.removeUser()
  }

  return(
    <NavigationBar>
      <Link to="/" ><NavigationItem>Blogs</NavigationItem></Link>
      <Link to="/users" ><NavigationItem id="usersNavigation" >Users</NavigationItem></Link>
      <NavigationItem >{props.user.name} logged in</NavigationItem>
      <NavigationItem ><CancelButton onClick={logout}>Logout</CancelButton></NavigationItem>
    </NavigationBar>
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
