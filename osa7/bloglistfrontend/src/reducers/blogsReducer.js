import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch( action.type ) {
  case 'GET_ALL' :
    return action.blogs
  case 'ADD_ONE' :
    return [...state, action.content]
  default:
    return state
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
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

export default blogsReducer