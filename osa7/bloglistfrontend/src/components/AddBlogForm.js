import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { addMessage } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import Togglable from '../components/Togglable'
import styled from 'styled-components'

const AddBlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlogFormRef = React.createRef()

  const Input = styled.input`
  background: white;
  padding: 10px;
  border: 1px solid #035a73;
`
  const Button = styled.button`
  background: #035a73;
  padding: 10px;
  border: 1px solid #035a73;
  color: white;
`

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try{
      const addedBlog = await blogService.create(
        {
          title: title.inputData.value ,
          author: author.inputData.value ,
          url: url.inputData.value  }
      )
      title.reset()
      author.reset()
      url.reset()
      props.addBlog(addedBlog)
      props.addMessage({
        message: `Uusi blogi ${addedBlog.title} kirjottajalta ${addedBlog.author} on lisätty`,
        alert : false })
    }catch(exception) {
      props.addMessage({
        message: `Virhe ${exception}`,
        alert: true })
      console.log(exception)
    }
  }

  return(
    <Togglable buttonText="Lisää uusi blogi" ref={addBlogFormRef}>
      <form onSubmit={handleAddBlog}>
        <h3>Create new blog</h3>
        <div>
                  Title
          <Input {...title.inputData}/>
        </div>
        <div>
                  Author
          <Input {...author.inputData}/>
        </div>
        <div>
                  Url
          <Input {...url.inputData}/>
        </div>
        <div>
          <Button type="submit">Luo blogi</Button>
        </div>
      </form>
    </Togglable>
  )
}

const mapDispatchToProps = {
  addMessage,
  addBlog
}

const ConnectedAddBlogForm = connect(null, mapDispatchToProps)(AddBlogForm)

export default ConnectedAddBlogForm
