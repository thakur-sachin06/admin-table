import React from 'react';
import './Modal.css';

const Modal = (props) => {
  const { title, body, onConfirm, onCancel } = props;
  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'>{title}</div>
        <div className='modal-body'>{body}</div>
        <div className='modal-footer'>
          <button
            className='modal-button cancel-button'
            onClick={onCancel}
          >
            No
          </button>
          <button
            className='modal-button delete-button'
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
