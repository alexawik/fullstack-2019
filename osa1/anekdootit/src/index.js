import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Votes = (props) => {
  console.log(props.vote) 
  return (
    <div>
      <p>has {props.vote} votes</p>
    </div>
  )
      
}

const MostPopular = (props) => {
  if (props.vote > 0) {
    return (
      <div>
        <p>has {props.vote} votes</p>
      </div>
    )
  } else {
    return (
      <p>No votes yet</p>
    )
  }
}

var votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);

const App = (props) => {
  const [selected, setSelected] = useState(0)
  var [copy, setCopy] = useState([])

  const setToVotes = (newValue) => {
      votes[newValue] ++
      setToCopy()

  }

  const setToCopy = () => {
    copy = [...votes]
    setCopy(copy)
    return copy[selected]
  }

  const setToSelected = (newValue) => {
      setSelected(newValue) 
  }

  const mostVotes = () => {
    var i = copy.indexOf(Math.max(...copy))
    return i
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <Votes vote={votes[selected]}/>
      <Button handleClick={()=> setToVotes(selected)} text="Vote"/>
      <Button handleClick={() => setToSelected(Math.floor(Math.random()*6))} text="Next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[mostVotes()]}</p>
      <MostPopular vote={votes[mostVotes()]}/>
    </div>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
