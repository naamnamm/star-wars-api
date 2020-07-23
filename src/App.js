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
        const homeworld = await axios.get(character.homeworld)
        character.homeworld = homeworld.data.name

        const species = character.species ? await axios.get(character.species) : null
        character.species = species.data.name
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


//<Pagination handleClick={handleClick} totalCharacters={character} charactersPerPage={charactersPerPage} />

//pagination should be showing 9 page (Math.ceil(character/10))

// componentDidMount() {
//   const peopleUrl = 'https://swapi.dev/api/people?page='
//   const range = (x) => [...Array(x).keys()];
//   let process = (promise) => {
//     promise.then(res => res.data)
//       .then(data => {
//         let newArray = [].push(data.name)
//         console.log(newArray)
//       })
//   }


//   axios
//     .all(range(this.state.totalPeoplePages)
//       .map(page => axios.get(peopleUrl + (page + 1))))
//     .then(res => {
//       let mappedArr = (res.map(res => res.data.results)).flat()
//       return mappedArr
//     })
//     .then(arr =>
//       arr.map((arr, index) => arr.homeworld ?
//         { ...arr, homeworld: process(axios.get(arr.homeworld)) }
//         : { ...arr })
//     )
//     .then(arr => this.setState({ results: arr }))
//     .catch(err => console.log(err))
// }


//const planetUrl = 'http://swapi.dev/api/planets/'
// axios.all(
//   range(this.state.totalPlanetPages)
//     .map(page => axios.get(planetUrl + (page + 1))))
//   .then(res => {
//     let mappedPlanets = res.map(planet => planet.data.name)
//     this.setState({ planets: mappedPlanets })
//   })

// componentDidMount() {
//   const baseUrl = 'https://swapi.dev/api/people?page='
//   const range = (x) => [...Array(x).keys()];

//   axios
//     .all(range(this.state.totalPages)
//       .map(page => axios.get(baseUrl + (page + 1))))
//     .then(res => {
//       let mappedArr = (res.map(res => res.data.results)).flat()
//       this.setState({ results: mappedArr })
//     })
//     .catch(err => console.log(err))

// }



// axios
// .all(range(this.state.totalPeoplePages)
//   .map(page => axios.get(peopleUrl + (page + 1))))
// .then(res => {
//   let mappedArr = (res.map(res => res.data.results)).flat()
//   return mappedArr
// })
// .then(arr => arr.forEach(arr => process(axios.get(arr.homeworld))))

// //.then(arr => this.setState({ results: arr }))
// .catch(err => console.log(err))



// axios
// .all(range(this.state.totalPeoplePages)
//   .map(page => axios.get(peopleUrl + (page + 1))))
// .then(res => {
//   let mappedArr = (res.map(res => res.data.results)).flat()
//   return mappedArr
// })
// .then(arr =>
//   arr.map(arr =>
//     arr.homeworld ?

//       { ...arr, homeworld: process(axios.get(arr.homeworld)) }
//       : { ...arr })

// )

    // axios
    //   .all(range(this.state.totalPeoplePages)
    //     .map(page => axios.get(peopleUrl + (page + 1))))
    //   .then(res => {
    //     let mappedArr = (res.map(res => res.data.results)).flat()
    //     return mappedArr
    //   })
    //   .then(arr => arr.map(character => character.homeworld.includes('http') ?
    //     { ...character, homeworld: parseInt(character.homeworld.replace(/^\D+/g, '')) - 1 }
    //     : { ...character }))
    //   .then(arr => this.setState({ results: arr }))
    //   .catch(err => console.log(err))