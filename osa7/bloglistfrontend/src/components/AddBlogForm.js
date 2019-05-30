import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { addMessage } from '../reducers/notificationReducer'

const AddBlogForm = (props) => {


  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
      props.addBlogToState(addedBlog)
      props.addMessage({
        message: `Uusi blogi ${addedBlog.title} kirjottajalta ${addedBlog.author} on lisätty`
        , alert : false })
    }catch(exception){
      props.addMessage({
        message: `Virhe ${exception}`,
        alert: true })
      console.log(exception)
    }
  }

  return(
    <form onSubmit={handleAddBlog}>
      <div>
                Title
        <input {...title.inputData}/>
      </div>
      <div>
                Author
        <input {...author.inputData}/>
      </div>
      <div>
                Url
        <input {...url.inputData}/>
      </div>
      <div>
        <button type='submit'>Luo blogi</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = {
  addMessage
}

const ConnectedAddBlogForm = connect(null, mapDispatchToProps)(AddBlogForm)

export default ConnectedAddBlogForm