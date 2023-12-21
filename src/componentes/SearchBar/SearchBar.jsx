import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className='search-bar' onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        className="search-input"
        placeholder='Buscar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className='btn btn-primary search-button'>Buscar</button>
    </form>
  );
};

export default SearchBar;


