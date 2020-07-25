import React from 'react';

const MainTable = ({ character, search, loading }) => {

  const showLoading = <tr><td colSpan="6" >Loading...</td></tr>

  const showAll = character.map(character =>
    <tr key={character.name}>
      <td>{character.name}</td>
      <td>{character.birth_year}</td>
      <td>{character.height}</td>
      <td>{character.mass}</td>
      <td>{character.homeworld}</td>
      <td>{character.species}</td>
    </tr>
  )

  const showSearch = character.filter(character =>
    character.name.toLowerCase().includes(search)).map(character =>
      <tr key={character.name}>
        <td>{character.name}</td>
        <td>{character.birth_year}</td>
        <td>{character.height}</td>
        <td>{character.mass}</td>
        <td>{character.homeworld}</td>
        <td>{character.species}</td>
      </tr>
    )

  let showContent = search ? showSearch : showAll

  let content = loading ? showLoading : showContent


  return (
    <table className="table table-bordered table-sm w-75 mx-auto my-4">

      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Homeworld</th>
          <th>Species</th>
        </tr>
      </thead>

      <tbody>
        {content}

      </tbody>

    </table>
  )
}

export default MainTable

