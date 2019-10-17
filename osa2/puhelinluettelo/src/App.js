import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import commService from './services/comm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterShown] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [opMessage, setOpMessage] = useState(null)
  const names = persons.map(person => person.name)
  
  useEffect(() => {
    commService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (names.includes(newName)) {
      const oldPerson = persons.find(person => person.name.includes(newName))
      const newPerson = { ...oldPerson, number: newNumber}

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        commService 
          .replace(oldPerson.id, newPerson)
          .then(response => {
            commService
              .getAll()
              .then(response => {
                setPersons(response.data)
                setOpMessage(
                  `Changed number for ${newName}`
                )
                setTimeout(() => {
                  setOpMessage(null)
                }, 3000)
            })
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      commService
        .create(personObject)
        .then(response => {
          commService
            .getAll()
            .then(response => {
              setPersons(response.data)
          })
          setNewName('')
          setNewNumber('')
          setOpMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setOpMessage(null)
          }, 3000)
        })
    }    
  }

  const removePerson = person => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}?`)) {
      commService
        .remove(id)
        .then(response => {
          commService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setOpMessage(
                `Removed ${person.name} from phonebook`
              )
              setTimeout(() => {
                setOpMessage(null)
              }, 3000)
          })
        })
        .catch (error => {
          setOpMessage(
            `${person.name} was already removed from phonebook`
          )
          setTimeout(() => {
            setOpMessage(null)
          }, 3000)
        })
      
    }
    
  }
  const handleNewName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={opMessage} />
      <Filter value={newFilter} onChange={handleNewFilter}/>
      <h2> Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNewName}
        numberValue={newNumber}
        numberOnChange={handleNewNumber}/>      
      <h2>Numbers</h2>
      <Persons showing={filterShown} filter={newFilter} persons={persons} remove={removePerson}/>
    </div>
  )
}

export default App
