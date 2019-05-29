import React from 'react'
import PropTypes from 'prop-types'






const LoginForm = ({ handleLogin, usernameInput, passwordInput }) => {
  return (
    <div>
      <h4>Syötä kirjautumistiedot</h4>
      <form onSubmit={handleLogin}>
        <div>
                    Käyttäjänimi
          <input {...usernameInput}/>
        </div>
        <div>
                     Salasana
          <input{...passwordInput}/>
        </div>
        <div>
          <button type='submit'>Kirjaudu</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  usernameInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired
}

export default LoginForm