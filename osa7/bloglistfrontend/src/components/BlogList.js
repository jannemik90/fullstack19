import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogList = (props) => {


  return(
    <div>
      {props.blogsList}
    </div>
  )
}

const Card = styled.div `
padding: 20px;
border-Color: red;
margin: 10px;
background-color: #1fc8f9;
box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
text-align: center;
`

const Text = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 200;
`

const mapBlogsToList = (blogs) =>
  blogs.map(blog =>
    <Card key={blog.id}>
      <Link to={`/blogs/${blog.id}`} >
        <Text>
          {blog.title} kirjoittajalta {blog.author}
        </Text>
      </Link>
    </Card>
  )



const mapStateToProps = (state) => {
  return {
    blogsList: mapBlogsToList(state.blogs)
  }
}



const ConnectedBlogList = connect(mapStateToProps)(BlogList)


export default ConnectedBlogList