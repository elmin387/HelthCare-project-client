import React, { useEffect, useState } from 'react'
import { ReportModalProps } from '../interfaces/ReportInterface'
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { createReport, getReportByAcceptance } from '../services/ReportService';

const ReportModal = ({show,onClose, acceptanceId, onSave, report}:ReportModalProps) => {
    const [description, setDescription] = useState<string>('');
    const [dateTimeofReport, setDateTimeofReport] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(!report);

  useEffect(() => {
    setDescription(report?.reportDescription || '');
    setDateTimeofReport(report?.dateTimeOfReport || new Date().toISOString());
    setIsEditing(!report);
  }, [report]);
    
    const handleSave = async () => {
        const reportData = {
          acceptanceId,
          reportDescription: description,
          dateTimeOfReport: new Date().toISOString(),
        };
    
        await createReport(reportData);
        onSave();
        onClose();
      };

//     return (
//         <Modal show={show} onHide={onClose} size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>Create Patient Report</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="reportDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={5}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       );
// }

// export default ReportModal
return (
  <Modal show={show} onHide={onClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{isEditing ? 'Create Patient Report' : 'View Patient Report'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="reportDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
          />
        </Form.Group>
        <Form.Group controlId="dateTimeOfReport">
            <Form.Label>Date and Time of Report</Form.Label>
            <Form.Control
              type="text"
              value={new Date(dateTimeofReport).toLocaleString()}
              disabled
            />
          </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      {isEditing ? (
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      )}
    </Modal.Footer>
  </Modal>
);
};

export default ReportModal;