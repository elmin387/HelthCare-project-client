import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { deleteItemById } from '../services/CommonServices'
import { ItemToDelete } from '../interfaces/SharedInterface'
import { useNavigate } from 'react-router-dom'
import { NAVIGATE } from '../utils/constants'

const DeleteModal = ({id,tableName}:ItemToDelete) => {
  const navigate = useNavigate();
  return (
    <div
      className='modal'
      id='modal'
      tabIndex={-1}
      data-show='true'
      role='dialog'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Patient Delete </h5>
            <button type='button' className='close' data-bs-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p>Do you want to delete this patient?</p>
          </div>
          <div className='modal-footer flex flex-row justify-center'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => deleteItemById(id, tableName).then(() => navigate(NAVIGATE.BACK))}
              data-bs-dismiss='modal'
            >
              Delete
            </button>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal