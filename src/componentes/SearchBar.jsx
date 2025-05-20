import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
return(
    <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nombre o ID"
        className="search-bar"
    />
);
}

export default SearchBar;
