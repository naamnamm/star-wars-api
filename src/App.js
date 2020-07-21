import React, { useState, useEffect } from 'react';
import './css/App.css';
import TableMain from './components/TableMain';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';

const App = () => {
  const [character, setCharacter] = useState([]);
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentCharacters, setCurrentCharacters] = useState([])
  const [onMount, setOnMount] = useState(true)

  //const totalCharacters = ''
  const charactersPerPage = 10
  const endingIndex = Number(currentPage * charactersPerPage)
  const startingIndex = Number(endingIndex - charactersPerPage)

  const getPeopleData = async () => {
    const peopleUrl = 'https://swapi.dev/api/people?page=';
    //const totalPeoplePages = 9
    //const range = (x) => [...Array(x).keys()];

    try {
      const responses = await axios.get(peopleUrl + currentPage)
      //const results = responses.data.results

      return responses
      //return results
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

  const sliceData = async (allCharacters) => {
    try {
      console.log(allCharacters)
      const currentCharacters = await allCharacters.slice(startingIndex, endingIndex)
      return currentCharacters
    }

    catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    //when components mount 
    //if the data is still loading showloading else showresult
    // const onMount = character ? showLoading : showResults
    // setOnMount(false)
    // return () => {
    //   cleanup
    // }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const peopleData = await getPeopleData();
      //totalCharacters = peopleData.data.count
      console.log(peopleData.data)
      const completedData = await getNestedData(peopleData.data.results);

      console.log(completedData)
      setCharacter(completedData)
      //setCharacter(peopleData)
      // const currentCharacters = await sliceData(completedData)
      // setCurrentCharacters(currentCharacters)
      // console.log(currentCharacters)

      setLoading(false)
    }

    fetchData();
  }, [currentPage])

  const handleClick = (currentPage) => {
    console.log(currentPage, loading)
    setCurrentPage(currentPage)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  // if firstloading // show jumbotron
  //if loading = true // show loading
  // otherwise // show content

  const showContent =
    <div className="App">
      <header className="App-header"></header>
      <SearchBar handleChange={handleChange} />
      <TableMain character={character} search={search} />
      <Pagination handleClick={handleClick} totalCharacters={character} charactersPerPage={charactersPerPage} />
    </div>

  const renderContent = loading ? <LoadingPage /> : showContent


  return (
    renderContent
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