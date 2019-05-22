import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'



const Number = ({person, onClick}) => 
<div>
  <p>{person.name} {person.number} </p> 
  <button onClick={onClick}>Poista</button>
</div>

const Notification = ({message, isErrorMessage}) =>{
  let notificationStyle = {
    backgroundColor: 'darkgreen',
    color: 'white',
    borderRadius: '20px',
    padding: '20px'
  }
  if(isErrorMessage){
    notificationStyle = {
      ...notificationStyle,
      backgroundColor: 'red'
    }
  }

  if(message === ''){
    return null
  }
  return(
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}

const checkIfExist = (checkedPerson, list) => {
    let exist = false
    list.forEach(person =>{
        if(checkedPerson.name.toLowerCase() === person.name.toLowerCase()){
            exist = true
        }
    })
    return exist
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification] = useState('')
  const [ isErrorMessage, setIsErrorMessage] = useState(true)
  
  useEffect(() =>{
     personService
     .getAll()
     .then(allPersons => {
       setPersons(allPersons)
     })
  }, [])

 const addNotification = (message, isErrorMessage) =>{
   setNotification(message)
   setIsErrorMessage(isErrorMessage)
   setTimeout(() =>{
     setIsErrorMessage('')
     setNotification('')
   }, 5000)
 } 

 const updatePerson = personObject => {
    const findedPerson = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())
    const changedPerson = {...findedPerson, number: newNumber}
    personService
    .update(findedPerson.id, changedPerson)
    .then(updatedPerson =>{
      setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
      setNewName('')
      setNewNumber('')
      addNotification(`Päivitetty henkilön ${updatedPerson.name} numero`)
    })
    .catch(error => {
      addNotification(`Henkilo ${personObject.name} oli jo poistettu palvelimelta`, true)
      setPersons(persons.filter(person => person.id !== findedPerson.id))
    })
 }

 const createNewPerson = personObject =>{
    personService
    .create(personObject)
    .then(addedPerson =>{
      setPersons(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
      addNotification(`Lisätty henkilo ${addedPerson.name}`)
    })
    .catch(error => {
      console.log(error.response.data)
      addNotification(error.response.data.error, true)

    })
 }


  const sendPersonForm = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      if(checkIfExist(personObject,persons)){
         const wantReplace = window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha uudella numerolla?`)
         if(wantReplace){
            updatePerson(personObject)
         } 
         return
      }
      createNewPerson(personObject)
  }

  const removePerson = (id, name) => {
    const wantDelete = window.confirm(`Poistetaanko ${name}`)
    if(wantDelete){
      personService
        .remove(id)
        .then(removedPerson =>{
          const personsCopy = persons.filter(person => person.id !== id)
          console.log(personsCopy)
          setPersons(personsCopy)
          addNotification(`Poistettu henkilo ${name}`)
        })
        .catch(error => {
          addNotification(`Henkilo ${name} oli jo poistettu palvelimelta`, true)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
}
  
  

  const filteredPersons = persons.map(person => 
    person.name.toLowerCase().includes(nameFilter.toLowerCase()) 
      ? <Number 
        key={person.name} 
        person={person} 
        onClick={() => removePerson(person.id,person.name)} 
        /> 
      : <></>)

  return (
    <div>
      <Notification message={notification} isErrorMessage={isErrorMessage}/>
      <h2>Puhelinluettelo</h2>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <PersonForm
      formOnSubmit={sendPersonForm}
      nameValue={newName} 
      nameHandler={handleNameChange} 
      numberValue={newNumber} 
      numberHandler={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

ReactDOM.render(<App />, 
    document.getElementById('root')
  )

export default App

