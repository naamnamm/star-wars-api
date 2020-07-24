import React from 'react'
import { Button } from 'reactstrap';


const pagination = ({ handleClick }) => {

  let pages = []

  for (let i = 1; i <= 9; i++) {
    pages.push(i)
  }

  const pagePagination = pages.map(page =>
    <Button key={page} onClick={() => handleClick(page)} className="mx-1"> {page} </Button>
  )

  return (
    <ul>
      {pagePagination}
    </ul>
  )
}

export default pagination



