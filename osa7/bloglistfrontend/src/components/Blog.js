import React from 'react'
import { connect } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { Redirect, withRouter } from 'react-router-dom'

const Blog = (props) => {
  const blogStyle = {
    padding: '20px',
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    margin: '10px'
  }

  const blogById = (id) => {
    return props.blogs.find(blog => blog.id === id)
  }
  const blog = blogById(props.id)

  if(blog === undefined) {
    return null
  }

  const addLike = async () => {
    console.log('BLOGI FUNKTIOSSA', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try{
      props.updateBlog(updatedBlog)
      console.log('klikattu')
    } catch(exception) {
      console.log(exception)
    }
  }

  const remove = async () => {
    try{
      const wantDelete = window.confirm(`Haluatko varmasti poistaa blogin ${blog.title} ?`)
      console.log('halutaanko',wantDelete)
      if(wantDelete){
        props.deleteBlog(blog.id)
        props.history.push('/')
      }
    } catch(exception) {
      console.log(exception)
    }
  }





  const showRemoveButton = props.user.username === blog.user.username
    ? <button onClick={remove}>Poista</button>
    : null


  return(
    <div className='mainBlog' style={blogStyle}>
      <h1>{blog.title} kirjoittajalta {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p><strong>{blog.likes} tykkäykset <button onClick={addLike}>Like</button></strong></p>
      <h5>Lisännyt {blog.user.name}</h5>
      {showRemoveButton}
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  updateBlog,
  deleteBlog
}
const BlogWithHistory = withRouter(Blog)
const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(BlogWithHistory)


export default ConnectedBlog
