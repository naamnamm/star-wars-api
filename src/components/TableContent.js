import React from 'react';

function TableContent(props) {


  return (
    <tr>
      <td>{props.character.name}</td>
      <td>{props.character.birth_year}</td>
      <td>{props.character.height}</td>
      <td>{props.character.mass}</td>
      <td>{props.character.homeworld}</td>
      <td>{props.character.species}</td>
    </tr>
  )
}

export default TableContent

//<tr>
//<td>{props.character.name}</td>
//<td>{props.character.birth_year}</td>
//<td>{props.character.height}</td>
//<td>{props.character.mass}</td>
//<td>{props.character.homeworld}</td>
//<td>{props.character.species}</td>
//</tr>

/* <td>name</td>
      <td>birth_year</td>
      <td>height</td>
      <td>mass</td>
      <td>homeworld</td>
      <td>species</td>
    </tr> */