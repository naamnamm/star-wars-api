import React from 'react';

function SearchBar(props) {
  return (
    <nav className='mt-3'>
      <input
        name="search"
        type="text"
        placeholder="Search character"
        onChange={props.handleChange} />
    </nav>
  )
}

export default SearchBar