import React from 'react'

const Persons = (props) => {
  const namesToShow = props.showing
    ? props.persons
    : props.persons.filter(person => person.name.includes(props.filter))

  const list = () => namesToShow.map(person => 
    <li key={person.name}>
      {person.name} {person.number} <button onClick={() => props.remove(person)}>Delete</button>
    </li>
  )  
  
  return (
    <ul>
      {list()}
    </ul>
  )
}

export default Persons