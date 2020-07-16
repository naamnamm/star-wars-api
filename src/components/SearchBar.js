import React from 'react';

function SearchBar(props) {
    return (
        <nav>
            <input
                name="search"
                type="text"
                placeholder="Search character"
                onChange={props.handleChange} />
        </nav>
    )
}

export default SearchBar