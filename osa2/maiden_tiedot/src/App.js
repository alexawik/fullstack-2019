import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const CountryInfo = (props) => {
  
  const country = props.countries.find(function(element) {
    return element.name.includes(props.name)
  })
  console.log(props.name)
  const languages = () => country.languages.map(language => <li key={language.name}>{language.name}</li>)
  console.log(country)
  
  useEffect(() => {
    console.log('effect')
    const eventHandler = response => {
      console.log('promise fulfilled')
      props.setTemp(response.data.main.temp)
      props.setWind(response.data.wind.speed)
    }
    
    const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=0707345a482e92b1b0e9043d2a6df184`)
    promise.then(eventHandler)  
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages()}
      </ul>
      <img src={country.flag} alt="flag" width="120"/>
      <h2>Weather in {country.capital}</h2>
      <h4>Temperature: {props.temp} Celsius</h4>
      <h4>Wind speed: {props.wind} kph</h4>
    </div>
  )
}



const CountryList = (props) => {
  const countries = props.countries
  const countriesShown = props.showing
    ? countries
    : countries.filter(country => country.name.includes(props.filter))
  
  const list = () => countriesShown.map(country =>
    <li key={country.name}>
      {country.name} <button onClick={() => props.setNew(country.name)}>Show</button>
    </li>
  )

  
  console.log('Countries on list', list().length)
  if (list().length === 1) {
    return (
      <CountryInfo name={list()[0].key} countries={countries} 
      setTemp={props.setTemp} temp={props.temp}
      setWind={props.setWind} wind={props.wind}/>
    )
  } else if (list().length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {list()}
        </ul>
      </div>
    )
  }
  
}


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ temp, setTemp ] = useState([])
  const [ wind, setWind ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ filterShown] = useState('')

  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  console.log('rendered', countries.length, 'countries')

  return (
    <div>
      <form>
        find countries <input value={newFilter} onChange={handleNewFilter}/>
      </form>
      <CountryList countries={countries} filter={newFilter} 
        showing={filterShown} setNew={setNewFilter} 
        setTemp={setTemp} temp={temp}
        setWind={setWind} wind={wind}/>
    </div>
  )
}

export default App
