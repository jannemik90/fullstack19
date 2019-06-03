import React from 'react'
import { connect } from 'react-redux'
import CreateCommentForm from './CreateCommentForm'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import {  withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
align-content: center;
`
const LikeButton = styled.button`
padding: 10px;
margin: 10px;
background-color: #75b603;
color: white;
border: 1px solid #75b603;
`

const Card = styled.div `
color: #423d33;
padding: 20px;
border-Color: red;
margin: 10px;
background-color: #1fc8f9;
box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
text-align: center;
`
const ListItem = styled.li`
font-size: 20px;
font-weight: 200;
background-color: white;
color: #423d33;
border-radius: 20px;
margin: 15px;
padding: 15px;
`

const Title1 = styled.h1`
font-weight: 800;
color: white;
`


const Blog = (props) => {


  const blogById = (id) => {
    return props.blogs.find(blog => blog.id === id)
  }
  const blog = blogById(props.id)
  console.log('blogi blogissa', blog)

  if(blog === undefined)
    return null


  const addLikeToBlog = async () => {
    console.log('BLOGI FUNKTIOSSA', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try{
      props.addLike(updatedBlog)
      console.log('klikattu')
    } catch(exception) {
      console.log(exception)
    }
  }

  const remove = async () => {
    try{
      const wantDelete = window.confirm(`Haluatko varmasti poistaa blogin ${blog.title} ?`)
      console.log('halutaanko',wantDelete)
      if(wantDelete) {
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

  const comments = blog.comments.length !== 0 ? blog.comments.map(comment => <ListItem key={comment.id}>{comment.text}</ListItem>) : <p>Ei kommentteja</p>

  return(
    <Wrapper>
      <Card>
        <Title1>{blog.title} kirjoittajalta {blog.author}</Title1>
        <a href={blog.url}>{blog.url}</a>
        <p><strong>{blog.likes} tykkäykset <LikeButton onClick={addLikeToBlog} id="likeButton">Like</LikeButton></strong></p>
        <h5>Lisännyt {blog.user.name}</h5>
        {showRemoveButton}
        <h4>Lisää kommentti</h4>
        <CreateCommentForm blog={blog} />
        <h5>Kommentit</h5>
        <ul>
          {comments}
        </ul>
      </Card>
    </Wrapper>
  )

}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  addLike,
  deleteBlog
}
const BlogWithHistory = withRouter(Blog)
const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(BlogWithHistory)


export default ConnectedBlog
