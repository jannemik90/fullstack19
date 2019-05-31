import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {

  return(
    <div>
      {props.blogsList}
    </div>
  )
}

const blogStyle = {
  padding: '20px',
  border: 'solid',
  borderColor: 'gray',
  borderWidth: 1,
  margin: '10px'
}

const mapBlogsToList = (blogs) =>
  blogs.map(blog =>
    <div key={blog.id} style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} >
        <p>
          {blog.title} kirjoittajalta {blog.author}
        </p>
      </Link>
    </div>
  )



const mapStateToProps = (state) => {
  return {
    blogsList: mapBlogsToList(state.blogs)
  }
}



const ConnectedBlogList = connect(mapStateToProps)(BlogList)


export default ConnectedBlogList