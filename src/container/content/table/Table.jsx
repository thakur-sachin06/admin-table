import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import './Table.css';
import { UserContext } from '../../context/UserContext';
import { DeleteOutline, Edit } from '@material-ui/icons';
import Pagination from '../../pagination/Pagination';

const PAGE_LIMIT = 10;

function Table({ tableHeaders }) {
  const { filteredData, setFiltered, userData } =
    useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  function showActions() {
    return (
      <>
        <DeleteOutline className='table-delete__icon' />
        <Edit className='table-edit__icon' />
      </>
    );
  }

  function filterData(pageNum) {
    setCurrentPage(pageNum);
    const start = (pageNum - 1) * PAGE_LIMIT;

    const currentData = filteredData.slice(
      start,
      start + PAGE_LIMIT
    );
    setCurrentData(currentData);
  }

  useEffect(() => {
    const currentData = filteredData.slice(0, PAGE_LIMIT);
    setCurrentData(currentData);
  }, [filteredData]);

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              {tableHeaders.map((header) => {
                return (
                  <th>
                    <button type='button'>
                      {header.label}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length ? (
              currentData.map((data, index) => (
                <tr key={index}>
                  <td>
                    {
                      <input
                        type='checkbox'
                        key={data.id}
                      />
                    }
                  </td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>{showActions()}</td>
                </tr>
              ))
            ) : (
              <div className='no-data-text'>
                No data found
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className='page'>
        <button className='delete-btn'>
          Delete Selected
        </button>
        <Pagination
          filterData={filterData}
          userData={userData}
        />
      </div>
    </>
  );
}

export default Table;
