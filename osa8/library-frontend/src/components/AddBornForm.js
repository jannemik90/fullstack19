import React, { useState } from 'react'
import Select from 'react-select';


  

const AddBornForm = (props) => {
    const [name, setName] = useState('')
    const [birthYear, setBirthYear] = useState('')
    

    const options = props.authors.map(a => {
        return(
          {value: a.name, label: a.name}
        )
      })

    const handleUpdateAuthor = async (e) => {
      e.preventDefault()
      await props.updateAuthor({variables: {name: name.value ,setBornTo: birthYear}})
      setBirthYear('')
      setName('')
    }

    const handleNameChange = selected =>{
        setName(selected)
    } 

    return(
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={handleUpdateAuthor}>
                <Select
                    value={name}
                    onChange={handleNameChange}
                    options={options}
                />
                <div>
                    Birthyear:    
                    <input 
                    value={birthYear}
                    type='text' 
                    onChange={({ target }) => setBirthYear(Number(target.value))}                    
                    />
                </div>
                <button type='submit'>
                    Update Author
                </button>
            </form>
        </div>
    )
}

export default AddBornForm