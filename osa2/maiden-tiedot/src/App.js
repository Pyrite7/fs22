import { useState, useEffect } from "react";
import axios from "axios";

function App() {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState("")

useEffect(() => {
  axios
  .get("https://restcountries.com/v3.1/all")
  .then(response => {
    setCountries(response.data)
    console.log(response.data)
  })
}, [])

const onSearchChange = (event) => {
  setSearch(event.target.value)
}

const countriesToShow = countries.filter((country) => {
  return(
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
})

const clickHandler = (event) => {
  console.log(event);
}
  
  return (
    <div>
      <p>Find country:</p> <input value={search} onChange={onSearchChange}/>

      <SearchResults countries={countriesToShow} setSearch={setSearch}/>
    </div>
  );
}

const SearchResults = ({countries, setSearch}) => {

  const showCountryInfo = (country) => {
    setSearch(country)
  } 

  if(countries.length === 0) {
    return(
      <div>
        <p>No matches</p>
      </div>
    )
  }
  else if(countries.length === 1) {
    const countryFound = countries[0]
    return(
      <CountryInfo country={countryFound}/>
    )
  }
  else if(countries.length <= 10) {
    return(
      <div>
        <ul>
          {countries.map(
            country => {
              const countryName = country.name.common
              return(<SearchResult key={countryName} countryName={countryName} showInfo={() => {showCountryInfo(countryName)}}/>)
            }
          )}
        </ul>
      </div>
    )
  }
  else {
    return(
      <div>
        <p>Too many matches, please specify</p>
      </div>
    )
  }
}

const SearchResult = ({countryName, showInfo}) => {
  return(
    <li>
       {countryName}
       <button onClick={showInfo}>Show info</button>
    </li>
  )
}

const CountryInfo = ({country}) => {

  return(
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p>languages: </p>
        <ul>
          {Object.values(country.languages).map(language =>{
            return(
              <li key={language}>{language}</li>
            )
          })}
        </ul>
        <img src={country.flags.png}/>
      </div>
  )
}

export default App;
