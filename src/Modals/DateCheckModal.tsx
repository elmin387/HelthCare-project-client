import React from 'react';

interface DateErrorModalProps {
  show: boolean;
  onClose: () => void;
}

const DateErrorModal: React.FC<DateErrorModalProps> = ({ show, onClose }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex={-1} aria-labelledby="dateErrorModalLabel" aria-hidden={!show}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="dateErrorModalLabel">Invalid Date</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            The date cannot be in the past.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateErrorModal;
