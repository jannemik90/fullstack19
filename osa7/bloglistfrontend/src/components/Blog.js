import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, updateLikes, removeBlog, username }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    padding: '20px',
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    margin: '10px'
  }
  const addLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try{
      const updated = await blogService.addLike(updatedBlog, blog.id)
      updateLikes(updated)
      setShowAll(true)
    } catch(exception) {
      console.log(exception)
    }
  }

  const remove = async () => {
    try{
      const wantDelete = window.confirm(`Haluatko varmasti poistaa blogin ${blog.title} ?`)
      console.log('halutaanko',wantDelete)
      if(wantDelete){
        await blogService.remove(blog.id)
        removeBlog(blog.id)
      }
    } catch(exception) {
      console.log(exception)
    }
  }

  const toggleShowAll = () => setShowAll(!showAll)

  const showRemoveButton = username === blog.user.username
    ? <button onClick={remove}>Poista</button>
    : null

  if(showAll){
    return(
      <div className='mainBlog' style={blogStyle} onClick={toggleShowAll}>
        <div>{blog.title} kirjoittajalta {blog.author}</div>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} tykkäykset <button onClick={addLike}>Like</button></div>
        <div>Lisännyt {blog.user.name}</div>
        {showRemoveButton}
      </div>
    )

  }

  return(
    <div className='mainBlog' style={blogStyle} onClick={toggleShowAll}>
      <p>{blog.title} kirjoittajalta {blog.author}</p>
    </div>
  )

}

export default Blog