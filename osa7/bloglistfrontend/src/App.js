import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import UserList from './components/UserList'
import User from './components/User'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { addBlog, getAllBlogs } from './reducers/blogsReducer'
import { addUser, removeUser } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = (props) => {


  useEffect(() => {
    props.getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      console.log('user',user)
      props.addUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const orderedBlogs = props.blogs.sort((a,b) => b.likes - a.likes)
  return (
    <Router>
      <Route exact path ='/' render={ () =>
        <div>
          <Notification />
          { props.user === null ?
            <div>
              <LoginForm/>
            </div>
            :
            <Layout>
              <AddBlogForm/>
              <BlogList />
            </Layout>
          }
        </div>
      }/>
      <Route exact path ='/users' render={ () =>
        <Layout>
          <UserList />
        </Layout>
      }/>
      <Route exact path='/users/:id' render={({ match }) =>
        <Layout>
          <User id={(match.params.id)} />
        </Layout>
      } />
      <Route exact path='/blogs/:id' render={({ match }) =>
        <Layout>
          <Blog id={(match.params.id)} />
        </Layout>
      } />
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  addBlog,
  getAllBlogs,
  addUser,
  removeUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default ConnectedApp