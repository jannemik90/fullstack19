import blogService from '../services/blogs'


const updateComments = (blogs, id, comment) => {
  blogs.forEach(blog => {
    if(blog.id === id){
      blog.comments.push({ id: comment.id, text: comment.text })
    }
  })
  console.log('Muutetut blogit', blogs)
  return blogs
}

const updateLikes = (blogs, id) => {
  blogs.forEach(blog => {
    if(blog.id === id) {
      blog.likes = blog.likes + 1
    }
  })
  return blogs
}

const blogsReducer = (state = [], action) => {
  switch( action.type ) {
  case 'GET_ALL' :
    return action.blogs
  case 'ADD_ONE' :
    return [...state, action.content]
  case 'ADD_LIKE':
    return  updateLikes([...state], action.content.id)
  case 'DELETE_BLOG' :
    return[...state].filter(blog => blog.id !== action.id)
  case 'ADD_COMMENT':
    return  updateComments([...state], action.content.blog, action.content)
  default:
    return state
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('blogit', blogs)
    dispatch({
      type: 'GET_ALL',
      blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_ONE' ,
      content: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id)
    console.log('DELETED', deletedBlog)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.addLike(blog, blog.id)
    dispatch({
      type: 'ADD_LIKE',
      content: updatedBlog
    })
  }
}

export const addComment = (comment) => {
  console.log('Lisätty kommentti', comment)
  return async dispatch => {
    const updatedComment = await blogService.addComment(comment, comment.blogId)
    console.log('vastaus kommenttiin', updatedComment)
    dispatch({
      type: 'ADD_COMMENT',
      content: updatedComment
    })
  }
}

export default blogsReducer