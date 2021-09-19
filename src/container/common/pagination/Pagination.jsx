import React, { useState, useEffect } from 'react';
import './Pagination.css';
import {
  NavigateNext,
  NavigateBefore,
} from '@material-ui/icons';

const PAGE_LIMIT = 10;

function Pagination({ filterData, userData }) {
  const totalPages = Math.ceil(userData.length / 10);

  const [activeItem, setActiveItem] = useState(1);
  const [paginatedData, setPaginatedData] = useState([
    1, 2, 3, 4, 5,
  ]);

  function getPaginationGroup() {
    if (activeItem === paginatedData.length) {
      let start =
        ((activeItem - 1) / PAGE_LIMIT) * PAGE_LIMIT;
      if (activeItem === totalPages) {
        return;
      }
      const arr = new Array(3)
        .fill()
        .map((_, idx) => start + idx + 1);
      setPaginatedData(arr);
    }
  }

  useEffect(() => {
    getPaginationGroup();
  }, [activeItem, setActiveItem]);

  return (
    <div className='pagination-container'>
      <NavigateBefore
        className={`prev ${
          activeItem === 1 ? 'disabled' : null
        } `}
        onClick={() => {
          filterData(activeItem - 1);
          setActiveItem(activeItem - 1);
        }}
      />
      {paginatedData.map((elt) => (
        <button
          className={`paginationItem ${
            activeItem === elt ? 'active' : 'null'
          }`}
          onClick={() => {
            setActiveItem(elt);
            filterData(elt);
          }}
        >
          {elt}
        </button>
      ))}
      <NavigateNext
        className={`next ${
          activeItem === totalPages ? 'disabled' : null
        } `}
        onClick={() => {
          filterData(activeItem + 1);
          setActiveItem(activeItem + 1);
        }}
      />
    </div>
  );
}

export default Pagination;
