import React, { useState } from 'react'
import {  useApolloClient   } from 'react-apollo-hooks';


const LoginForm = (props) => {
    const client = useApolloClient()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!props.show) {
        return null
      }

    const submit = async (e) => {
        e.preventDefault()

        try{
            const result = await props.login({
                variables: { username, password}
            })
            const token = result.data.login.value 

          props.setToken(token)
          localStorage.setItem('app-user-token', token)
          client.resetStore()
          props.redirect()
        } catch(exception) {
            console.log(exception)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Käyttäjänimi
                    <input 
                    value={username}
                    type="text" 
                    onChange={({ target }) => setUsername(target.value)} 
                    />  
                </div>
                <div>
                    Salasana
                    <input 
                    value={password}
                    type="password"
                    onChange={({ target }) => setPassword(target.value)} 
                    />
                </div>
                <button>Kirjaudu sisään</button>
            </form>
        </div>
    )
}

export default LoginForm