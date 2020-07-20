import React from 'react';
import TableContent from './TableContent';

function TableMain({ character, search }) {

  //to show the first 10
  // slice first 10
  // starting index = 0
  // ending index = 10
  // page 1 - show 1-10
  // page 2 - show 11-20
  // page 3 - show 21-30

  // 1 - slice 0-10 
  // ending index = current page(1) * characterPerpage (10)
  // starting index = ending(10) - characterperpage(10)
  // 2 - slice 11-20
  // EI = 2*10 = 20
  // SI = 20-10 = 10

  const showAll = character.map(character =>
    <TableContent key={character.name} character={character} />
  )

  const showSearch = character.filter(character =>
    character.name.toLowerCase().includes(search)).map(character =>
      <TableContent key={character.name} character={character} />
    )

  let content = search ? showSearch : showAll


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

export default TableMain

