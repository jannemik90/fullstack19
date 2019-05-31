import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch( action.type ) {
  case 'GET_ALL' :
    return action.blogs
  case 'ADD_ONE' :
    return [...state, action.content]
  case 'UPDATE_BLOG':
    return  [...state].map(blog => blog.id === action.content.id ? action.content : blog)
  case 'DELETE_BLOG' :
    return[...state].filter(blog => blog.id !== action.id)
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

export const updateBlog = (blog) => {
  console.log('Updated1', blog)
  return async dispatch => {
    const updatedBlog = await blogService.addLike(blog, blog.id)
    console.log('Updated2', updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      content: updatedBlog
    })
  }
}

export default blogsReducer