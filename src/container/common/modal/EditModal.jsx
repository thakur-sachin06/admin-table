import React, { useState } from 'react';
import './Modal.css';

const EditModal = (props) => {
  const { userToEditData, onChange, onCancel } = props;

  const [name, setName] = useState(
    userToEditData.name || ''
  );
  const [email, setEmail] = useState(
    userToEditData.email || ''
  );
  const [role, setRole] = useState(
    userToEditData.role || ''
  );

  function handleOnChange() {
    const newUser = {
      id: userToEditData.id,
      name,
      email,
      role,
    };
    onChange(newUser);
  }

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'>Edit this User</div>
        <div className='modal-body'>
          <div className='form'>
            <label>Name </label>
            <input
              className='modal-input'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
              data-testid='name-input'
            />
          </div>
        </div>
        <div className='modal-body'>
          <div className='form'>
            <label>Email </label>
            <input
              className='modal-input'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              data-testid='email-input'
            />
          </div>
        </div>
        <div className='modal-body'>
          <div className='form'>
            <label>Role </label>
            <input
              className='modal-input'
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              data-testid='role-input'
            />
          </div>
        </div>
        <div className='modal-footer'>
          <button
            className='modal-button cancel-button'
            onClick={handleOnChange}
            data-testid='confirm-button'
          >
            Yes
          </button>
          <button
            className='modal-button no-button'
            onClick={onCancel}
            data-testid='cancel-button'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
