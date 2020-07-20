import React, { useState, useEffect } from 'react';
import './css/App.css';
import TableMain from './components/TableMain';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import axios from 'axios';

const App = () => {
  const [character, setCharacter] = useState([]);
  const [search, setSearch] = useState("")
  const [charactersPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const getPeopleData = async () => {
    const peopleUrl = 'https://swapi.dev/api/people?page=';
    const totalPeoplePages = 9
    const range = (x) => [...Array(x).keys()];

    try {
      const promises = range(totalPeoplePages)
        .map(page => axios.get(peopleUrl + (page + 1)))
      const responses = await Promise.all(promises)
      const results = responses.map(data => data.data.results).flat()

      return results
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
      const peopleData = await getPeopleData();
      //const completedData = await getNestedData(peopleData);

      setCharacter(peopleData)
    }

    fetchData();
  }, [])

  const handleClick = (currentPage) => {
    console.log(currentPage)
    setCurrentPage(currentPage)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const endingIndex = Number(currentPage * charactersPerPage)
  const startingIndex = Number(endingIndex - charactersPerPage)
  console.log(startingIndex, endingIndex)

  const currentCharacters = character.slice(startingIndex, endingIndex)



  return (
    <div className="App">
      <header className="App-header"></header>

      <SearchBar handleChange={handleChange} />

      <TableMain character={currentCharacters} search={search} />

      <Pagination handleClick={handleClick} totalCharacters={character} charactersPerPage={charactersPerPage} />

    </div>
  );

}

export default App;


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