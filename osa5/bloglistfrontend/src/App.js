import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import { useField } from './hooks/index'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState(true)

  const username = useField('text')
  const password = useField('password')

  const addBlogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      console.log('user',user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username: username.inputData.value, password: password.inputData.value })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setNewUser(user)
      blogService.setToken(user.token)
      addNotification(`Tervetuloa ${user.name}`, false)
      username.reset()
      password.reset()
    } catch (exception) {
      addNotification(`Error: ${exception}`, true)
      console.log(exception)
    }
  }



  const addNotification = (message, isErrorMessage) => {
    setNotification(message)
    setIsErrorMessage(isErrorMessage)
    setTimeout(() => {
      setIsErrorMessage('')
      setNotification('')
    }, 5000)
  }

  const addBlog = (blog) => {
    addBlogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(blog))
  }

  const updateLikes = (updatedBlog) => {
    const copy = [...blogs]
    copy.forEach(blog => {
      if(blog.id === updatedBlog.id){
        blog.likes = blog.likes +1
      }
    })
    setBlogs(copy)
  }

  const removeBlog = (id) => {
    const blogsCopy = [...blogs].filter(blog => blog.id !== id)
    console.log('id vertailussa', id)
    setBlogs(blogsCopy)
  }

  const setNewUser = (user) => {
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const orderedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <Notification message={notification} isErrorMessage={isErrorMessage}/>
      { user === null ?
        <div>
          <h3>Kirjaudu sisään</h3>
          <Togglable buttonText='Kirjaudu'>
            <LoginForm
              handleLogin={handleLogin}
              usernameInput={username.inputData}
              passwordInput={password.inputData}
            />
          </Togglable>
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <Togglable buttonText='Lisää uusi blogi' ref={addBlogFormRef}>
            <h3>Create new blog</h3>
            <AddBlogForm
              addBlogToState={addBlog}
              addNotification={addNotification}
            />
          </Togglable>
          <button onClick={logout}>Logout</button>
          {orderedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes = {updateLikes}
              removeBlog = {removeBlog}
              username = {user.username}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App