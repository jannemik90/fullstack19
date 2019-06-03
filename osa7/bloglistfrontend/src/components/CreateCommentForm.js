import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import styled from 'styled-components'

const CreateCommentForm =  (props) => {

  const Input = styled.input`
  background: white;
  padding: 20px;
  border: 1px solid #035a73;
`
  const Button = styled.button`
  background: #035a73;
  padding: 20px;
  border: 1px solid #035a73;
  color: white;
`

  const commentText = useField('text')

  const handleAddComment = async (event) => {
    console.log('handlecomment')
    event.preventDefault()
    try{
      const addedComment =  {
        text: commentText.inputData.value,
        blogId: props.blog.id
      }
      commentText.reset()
      props.addComment(addedComment)
    }catch(exception) {
      props.addMessage({
        message: `Virhe ${exception}`,
        alert: true })
      console.log(exception)
    }
  }


  return(
    <div>
      <form onSubmit={handleAddComment}>
        <Input {...commentText.inputData} />
        <Button type="submit">Lisää kommentti</Button>
      </form>
    </div>
  )
}

const ConnectedCreateCommentForm = connect(null, { addComment })(CreateCommentForm)

export default ConnectedCreateCommentForm
