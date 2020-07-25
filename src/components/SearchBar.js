import React from 'react';

const SearchBar = ({ handleChange }) => {
  return (
    <nav className='mt-3 rounded'>
      <input
        name="search"
        type="text"
        placeholder="Search character"
        onChange={handleChange} />
    </nav>
  )
}

export default SearchBar