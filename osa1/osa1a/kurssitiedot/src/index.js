import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.osa} {props.harjoituksia}
            </p>
        </div>        
    )
}

const Content = (props) => {
    return (
        <div>
            <Part osa={props.osa} harjoituksia={props.harjoituksia} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>yhteensä {props.sum} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <>
            <Header course={course}/>
            <Content osa={part1} harjoituksia={exercises1}/>            
            <Content osa={part2} harjoituksia={exercises2}/>
            <Content osa={part3} harjoituksia={exercises3}/>
            <Total sum={exercises1 + exercises2 + exercises3}/>           
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

