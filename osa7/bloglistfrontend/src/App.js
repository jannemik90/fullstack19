import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import { useField } from './hooks/index'
import loginService from './services/login'
import { connect } from 'react-redux'
import { addBlog, getAllBlogs } from './reducers/blogsReducer'



const App = (props) => {
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  const addBlogFormRef = React.createRef()

  useEffect(() => {
    props.getAllBlogs()
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
      // addNotification(`Tervetuloa ${user.name}`, false)
      username.reset()
      password.reset()
    } catch (exception) {
      // addNotification(`Error: ${exception}`, true)
      console.log(exception)
    }
  }



  const addBlog = (blog) => {
    addBlogFormRef.current.toggleVisibility()
    props.addBlog(blog)
  }

  const updateLikes = (updatedBlog) => {
    const copy = [...props.blogs]
    copy.forEach(blog => {
      if(blog.id === updatedBlog.id){
        blog.likes = blog.likes +1
      }
    })
    props.addBlog(copy)
  }

  const removeBlog = (id) => {
    const blogsCopy = [...props.blogs].filter(blog => blog.id !== id)
    console.log('id vertailussa', id)
    props.addBlog(blogsCopy)
  }

  const setNewUser = (user) => {
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const orderedBlogs = props.blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <Notification />
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addBlog,
  getAllBlogs
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default ConnectedApp