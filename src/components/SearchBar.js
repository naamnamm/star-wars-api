import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

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