import React from 'react';
import './Header.css';

function Header({
  searchText,
  setSearchText,
  debounceSearch,
}) {
  return (
    <div className='header'>
      <h1 className='header-text'>Admin Page</h1>
      <input
        type='search'
        className='search'
        placeholder='Search user...'
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounceSearch(e.target.value.toLowerCase());
        }}
        data-testid='search-input'
      />
    </div>
  );
}

export default Header;
