import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Reititys',
          exercises: 3,
          id: 1
        },
        {
          name: 'Väliohjelmistot',
          exercises: 7,
          id: 2
        }
      ]
    }    
  ] 
  
  return (
    <div>
      <h1>Devaus-opinnot</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
