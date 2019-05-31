import React, { useEffect } from 'react'
import { getAllUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'



const User = ( props ) => {

  useEffect(() => {
    props.getAllUsers()
  }, [])


  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }

  const user = userById(props.id)
  console.log(user)

  if(user === undefined){
    return null
  }

  const blogs = user.blogs.map(blog =>
    <li key={blog.id}>
      {blog.title}
    </li>
  )

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>AddedBlogs</h3>
      <ul>
        {blogs}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



const ConnectedUser = connect(mapStateToProps, { getAllUsers })(User)

export default ConnectedUser
