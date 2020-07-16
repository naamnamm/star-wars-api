import React from 'react';
import './css/App.css';
import MainTable from './components/MainTable';
import SearchBar from './components/SearchBar';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      totalPeoplePages: 9,
      planets: [],
      search: ""
    }
  }

  componentDidMount() {
    const peopleUrl = 'https://swapi.dev/api/people?page='
    const planetUrl = 'http://swapi.dev/api/planets/'
    const range = (x) => [...Array(x).keys()];
    let process = (promise) => {
      promise.then(data => {
        console.log(data.data.name)
      })
    }

    axios
      .all(range(this.state.totalPeoplePages)
        .map(page => axios.get(peopleUrl + (page + 1))))
      .then(res => {
        let mappedArr = (res.map(res => res.data.results)).flat()
        return mappedArr
      })
      .then(arr =>
        arr.map(arr => arr.homeworld ?
          { ...arr, homeworld: process(axios.get(arr.homeworld)) }
          : { ...arr })
      )
      .then(arr => this.setState({ results: arr }))
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    console.log(this.state.results)
    console.log(this.state.planets)
    return (
      <div className="App">
        <header className="App-header"></header>

        <SearchBar handleChange={this.handleChange} />

        <MainTable character={this.state.results} search={this.state.search} />

      </div>
    );
  }
}

export default App;

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