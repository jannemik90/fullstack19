import React from 'react'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'
import { addUser } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username: username.inputData.value, password: password.inputData.value })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      props.addUser(user)
      blogsService.setToken(user.token)
      // addNotification(`Tervetuloa ${user.name}`, false)
      username.reset()
      password.reset()
    } catch (exception) {
      // addNotification(`Error: ${exception}`, true)
      console.log(exception)
    }
  }

  return (
    <div>
      <h3>Kirjaudu sisään</h3>
      <h4>Syötä kirjautumistiedot</h4>
      <form onSubmit={handleLogin}>
        <div>
                    Käyttäjänimi
          <input {...username.inputData} id="username"/>
        </div>
        <div>
                     Salasana
          <input {...password.inputData} id="password" />
        </div>
        <div>
          <button type="submit" id="login">Kirjaudu</button>
        </div>
      </form>
    </div>
  )
}

const ConnectedLoginForm = connect(null, { addUser })(LoginForm)

export default ConnectedLoginForm


