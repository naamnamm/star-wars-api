import React from 'react'


const pagination = ({ totalCharacters, charactersPerPage, handleClick }) => {

  let pages = []

  for (let i = 1; i <= 9; i++) {
    pages.push(i)
  }

  // const displayPage = (e) => {
  //   console.log(e)
  // }

  const pagePagination = pages.map(page => (
    <li key={page}>
      <button onClick={() => handleClick(page)} > {page} </button>
    </li>
  )
  )

  return (
    <ul>
      {pagePagination}
    </ul>
  )
}

export default pagination


//page 1 - display 1-10
