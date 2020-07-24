import React, { useState, useEffect } from 'react';
import './css/App.css';
import MainTable from './components/MainTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import axios from 'axios';

const App = () => {
  const [character, setCharacter] = useState([]);
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const getPeopleData = async () => {
    const peopleUrl = 'https://swapi.dev/api/people?page=';
    try {
      const responses = await axios.get(peopleUrl + currentPage)

      return responses
    }

    catch (err) {
      console.log(err.message)
    }
  }

  const getNestedData = async (arrayOfCharacters) => {
    try {
      for (let character of arrayOfCharacters) {
        const homeworld = await axios.get(character.homeworld.replace('http', 'https'))
        character.homeworld = homeworld.data.name

        const species = character.species.length >= 1
          ? await (await axios.get(character.species[0].replace('http', 'https'))).data.name
          : null

        character.species = species
      }

      return arrayOfCharacters
    }

    catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const peopleData = await getPeopleData();

      const completedData = await getNestedData(peopleData.data.results);

      setCharacter(completedData)

      setLoading(false)
    }

    fetchData();
  }, [currentPage])

  const handleClick = (currentPage) => {
    setCurrentPage(currentPage)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header"><h1>Star Wars API</h1></header>

      <SearchBar handleChange={handleChange} className='rounded' />

      <MainTable character={character} search={search} loading={loading} />

      <Pagination handleClick={handleClick} />
    </div>
  );

}

export default App;

