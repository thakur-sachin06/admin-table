import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import './Table.css';
import { UserContext } from '../../context/UserContext';
import { DeleteOutline, Edit } from '@material-ui/icons';
import Pagination from '../pagination';
import Modal from '../modal/Modal';
import EditModal from '../modal/EditModal';

const PAGE_LIMIT = 10;
let modalData = {
  title: '',
  body: '',
};

function Table({ tableHeaders }) {
  const { filteredData, setFiltered, userData } =
    useContext(UserContext);

  const [activePaginatedItem, setActivePaginatedItem] =
    useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [selectedUser, setSlectedUser] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [userToEditData, setUserToEditData] = useState({});

  const [selectedUsers, setSelectedUsers] = useState([]);

  function onCancel() {
    setIsModalOpen(false);
  }

  function onEditCancel() {
    setIsEdit(false);
    setIsModalOpen(false);
  }

  function handleDeleteUser(isDeleteMultiple = false) {
    let newUserData = [...filteredData];
    if (!isDeleteMultiple) {
      newUserData = newUserData.filter(
        (elt) => elt.id !== selectedUser
      );
    } else {
      selectedUsers.map((elt) => {
        newUserData = newUserData.filter(
          (data) => data.id !== elt
        );
      });
    }
    setFiltered(newUserData);
    filterData(currentPage, newUserData);
    setIsModalOpen(false);
  }

  function onChange(newUser) {
    const newUserData = filteredData.map((elt) => {
      if (newUser.id === elt.id) {
        elt.name = newUser.name;
        elt.role = newUser.role;
        elt.email = newUser.email;
        return elt;
      }
      return elt;
    });
    setFiltered(newUserData);
    filterData(currentPage, newUserData);
    setIsEdit(false);
    setIsModalOpen(false);
  }

  function handleEditUser(id, name, email, role) {
    const user = { id, name, email, role };
    setUserToEditData(user);
    setIsModalOpen(true);
    setIsEdit(true);
    setSlectedUser(id);
  }

  function createModalData(isEdit = false) {
    modalData.title = isEdit ? 'Edit User' : 'Delete User';
    modalData.body = isEdit
      ? 'Are you sure you want to edit this user ?'
      : 'Are you sure you want to delete this user ?';
  }

  function showActions(id, name, email, role) {
    return (
      <>
        <div
          className='icon-wrapper'
          onClick={() => {
            createModalData();
            setIsModalOpen(true);
            setSlectedUser(id);
          }}
          data-testId='delete-user'
        >
          <DeleteOutline className='table-delete__icon' />
        </div>
        <div
          className='icon-wrapper'
          onClick={() => {
            handleEditUser(id, name, email, role);
          }}
          data-testId='edit-user'
        >
          <Edit className='table-edit__icon' />
        </div>
      </>
    );
  }

  function filterData(pageNum, data = filteredData) {
    setCurrentPage(pageNum);
    const start = (pageNum - 1) * PAGE_LIMIT;

    const currentData = data.slice(
      start,
      start + PAGE_LIMIT
    );
    setCurrentData(currentData);
  }

  useEffect(() => {
    if (currentPage === 1) {
      const currentData = filteredData.slice(0, PAGE_LIMIT);
      setCurrentData(currentData);
    }
  }, [filteredData]);

  function toggleSelectedUsers(userId) {
    let users = [];
    if (selectedUsers.indexOf(userId) < 0) {
      users = [...selectedUsers];
      users.push(userId);
    } else {
      users = selectedUsers.filter((id) => id !== userId);
    }
    setSelectedUsers(users);
  }

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              {tableHeaders.map((header) => {
                return (
                  <th key={header.label}>
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
                        onChange={(e) =>
                          toggleSelectedUsers(data.id)
                        }
                        data-testid='checkbox'
                        style={{
                          cursor: 'pointer',
                          height: '18px ',
                          width: '18px',
                        }}
                      />
                    }
                  </td>
                  <td data-testid='name'>{data.name}</td>
                  <td data-testid='email'>{data.email}</td>
                  <td data-testid='role'>{data.role}</td>
                  <td>
                    {showActions(
                      data.id,
                      data.name,
                      data.email,
                      data.role
                    )}
                  </td>
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
        <button
          className={`delete-btn ${
            selectedUsers.length
              ? ''
              : 'delete-btn__disabled'
          } `}
          onClick={() => handleDeleteUser(true)}
          data-testid='delete-selected'
        >
          Delete Selected
        </button>
        <Pagination
          filterData={filterData}
          userData={userData}
          setActiveItem={setActivePaginatedItem}
          activeItem={activePaginatedItem}
        />
      </div>
      {isModalOpen && !isEdit && (
        <Modal
          onCancel={onCancel}
          title={modalData.title}
          body={modalData.body}
          onConfirm={() => handleDeleteUser(false)}
          data-testId='delete-modal'
        />
      )}
      {isModalOpen && isEdit && (
        <EditModal
          onCancel={onEditCancel}
          userToEditData={userToEditData}
          setUserToEditData={setUserToEditData}
          onChange={onChange}
          data-testId='edit-modal'
        />
      )}
    </>
  );
}

export default Table;
