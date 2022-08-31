import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber]  = useState("")

  const [search, setSearch] = useState("")

  const [notifMessage, setNotifMessage] = useState("test")
  const [isError, setIsError] = useState(false)

  const showNotification = (message, error = false) => {
    setNotifMessage(message)
    setIsError(error)
    setTimeout(() =>  {
      setNotifMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personsService
    .getAll()
    .then(personsData => {
      setPersons(personsData)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    let alreadyHasName = false
    let personWhoAlreadyHasThisName
    persons.forEach(person => {
      if(person.name === newName){
        alreadyHasName = true
        personWhoAlreadyHasThisName = person
      }
    });

    if(alreadyHasName){
      if(window.confirm(newName + " is already added to the phonebook, replace the old number with the new one?")){
        const oldPerson = personWhoAlreadyHasThisName
        const changedPerson = {...oldPerson, number: newNumber}
        personsService
        .update(changedPerson.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
          showNotification(`Successfully changed ${changedPerson.name}'s number`)
        })
        .catch(error => {
          showNotification(`Information of ${changedPerson.name} has already been removed from the server`, true)
        })
      }
    }
    else {
      personsService
      .create(newPersonObject)
      .then(newPersonData => {
        setPersons(persons.concat(newPersonData))
        showNotification(`Successfully added ${newPersonData.name}`)
      })

      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(
    person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
    personsService
    .remove(person.id)
    .then(deletedPerson => {
      setPersons(persons.filter(n => n.id !== deletedPerson.id))
      showNotification(`Successfully removed ${deletedPerson.name}`)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} error={isError}/>
      <Filter search={search} handleChange={handleSearchChange}/>

      <h2>Add new</h2>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <div>
       <ul>
         {personsToShow.map(person =>
         <Person key={person.name} person={person} deleteMethod={() => deletePerson(person)}/>
         )}
        </ul>
      </div>
    </div>
  )

}

const Filter = (props) => {
  return(
    <div>
        search: <input value={props.search} onChange={props.handleChange}/>
      </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({person, deleteMethod}) => {
  return(
    <div>
      <li>{person.name} {person.number} <button onClick={deleteMethod}>delete</button></li>
    </div>
  )
}

const Notification = ({message, error}) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if(message === null){
    return null
  }

  if(!error){
    return(
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
  else{
    return(
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
}

export default App