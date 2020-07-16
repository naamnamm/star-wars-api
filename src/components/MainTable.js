import React from 'react';
import MainContent from './MainContent';

function MainTable(props) {

  const renderAllCharacters = props.character.map(character =>
    <MainContent character={character} />
  )

  const renderSearchChar = props.character.filter(character =>
    character.name.toLowerCase().includes(props.search)).map(character =>
      <MainContent character={character} />
    )

  let content = !props.search ? renderAllCharacters : renderSearchChar

  return (
    <table>

      <thead>
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