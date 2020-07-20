import React from 'react'


const pagination = ({ totalCharacters, charactersPerPage, handleClick }) => {
  let totalPages = Math.ceil(totalCharacters.length / charactersPerPage)

  let pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  // const displayPage = (e) => {
  //   console.log(e)
  // }

  const pagePagination = pages.map(page => (
    <li key={page}>
      <a href="!#" onClick={() => handleClick(page)}> {page} </a>
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
