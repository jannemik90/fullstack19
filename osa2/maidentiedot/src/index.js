import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const CountryListItem = ({country, clickHandler}) => 
    <div>
        <p key={country.name}>{country.name}</p><button onClick={clickHandler}>Show</button>
    </div>
    



const CountryInfo = ({country, weatherInfo}) =>{
    
    const languages = country.languages.map((language, i) => <li key={i}>{language.name}</li>)

    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>population {country.population}</p>
            
            <h2>Languages</h2>
            <ul>
                {languages}
            </ul>
            <img src={country.flag} width='300' alt={country.name}/>
            <h2>Weather</h2>
            <p><strong>Temperature</strong> {weatherInfo.current.temp_c}</p>
            <img src={weatherInfo.current.condition.icon} />
            <p><strong>Wind</strong> {weatherInfo.current.wind_kph} kph directtion{weatherInfo.current.wind_dir}</p>

        </div>
    )
}

const Filter = ({filterValue, filterHandler}) => {
    return(
        <div>
            <p>Find countries</p>
            <input value={filterValue} onChange={filterHandler} />
        </div>
    )
} 

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    },[])


        useEffect(() => {
            if(filteredCountries.length === 0){
                return;
            }
            axios
                .get(`http://api.apixu.com/v1/current.json?key=34784a06227c4f5da2302726191805&q=${filteredCountries[0].capital}`)
                .then(response => {
                    setWeather(response.data)
                })
        },[filter])
       
         console.log(weather)
        const filterHandler = (event) =>{
        setFilter(event.target.value)
    }

    const setFilterText = (newFilter) => {
        setFilter(newFilter)
    }

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    console.log('Filtered', filteredCountries)
    const countryList = filteredCountries.length <= 10 ?
         filteredCountries.length === 1 ?
             <CountryInfo country={filteredCountries[0]} weatherInfo={weather} /> 
            : filteredCountries.map(country => <CountryListItem country={country} clickHandler={() => setFilterText(country.name)} />)
        : <p>Too many matches, specify another filter</p>
        console.log(countryList)
    return(
        <>
        <h1>Countries database</h1>
        <Filter filterValue={filter} filterHandler={filterHandler} />
        {countryList}
        </>
    )
}





ReactDOM.render(<App />, document.getElementById('root'));


