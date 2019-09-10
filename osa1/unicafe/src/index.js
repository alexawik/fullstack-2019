import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Statistic = (props) => {
    if (props.text.includes("positive")) {
        return (
            <table>
                <tbody>
                    <tr>                       
                        <td>{props.text}</td>
                        <td>{props.value} %</td>
                    </tr>
                </tbody>
            </table>
        )
    } else  {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{props.text}</td> 
                        <td>{props.value}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = (props.good + (-props.bad))/all
    const positive = props.good / all * 100
    if (all>0) {
        return (
            <div>
                <Statistic text="good" value={props.good}/>
                <Statistic text="neutral" value={props.neutral}/>
                <Statistic text="bad" value={props.bad}/>
                <Statistic text="all" value={all}/>
                <Statistic text="average" value={average}/>
                <Statistic text="positive" value={positive}/>
            </div>
        )
    } else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.name}
    </button>    
)

const App = () => {
  // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = (newValue) => {
        setGood(newValue)
    }
    const setToNeutral = (newValue) => {
        setNeutral(newValue)
    }
    const setToBad = (newValue) => {
        setBad(newValue)
    }
    return (
        <div>
            <Header name="Give feedback"/>
            <Button handleClick={() => setToGood(good + 1)} name="good"/>
            <Button handleClick={() => setToNeutral(neutral + 1)} name="neutral"/>
            <Button handleClick={() => setToBad(bad + 1)} name="bad"/>
            <Header name="Statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)