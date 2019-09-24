import React from 'react'

const Course = (props) => {
  const header = props.course.name
  const { parts } = props.course

  const rows = () =>
    parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)

  const totalExercises = parts.map(part => part.exercises)

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = totalExercises.reduce(reducer)


    return (
        <div>
            <h2>{header}</h2>
            <ul>
              {rows()}
            </ul>
            <h4>yhteensä {total} tehtävää</h4>
        </div>
    )
}

export default Course