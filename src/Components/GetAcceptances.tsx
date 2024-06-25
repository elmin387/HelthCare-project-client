    import React, { ChangeEvent, useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom';
    import { GetAcceptanceList, fetchAcceptanceById } from '../services/GetAcceptancesService';
    import { Acceptance, AcceptanceProps } from '../interfaces/AcceptanceInterface';
    import { NAVIGATE } from '../utils/constants';
    import ClipLoader from 'react-spinners/ClipLoader';
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
import { PatientReportItem } from '../interfaces/ReportInterface';
import { getReportByAcceptance } from '../services/ReportService';


    const GetAcceptances = ({acceptances,fetchedAcceptances, loading, reportData}: AcceptanceProps) => {
        const[searchName, setSearchName]=useState('')
        const [fromDate, setFromDate] = useState('');
        const [toDate, setToDate] = useState('');
        const navigate = useNavigate();
        const [previewData, setPreviewData] = useState(null);
        
        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            if (name === 'fromDate') {
                setFromDate(value);
            } else if (name === 'toDate') {
                setToDate(value);
            }
        };
        useEffect(() => {
            if (fromDate && toDate) {
                fetchedAcceptances(fromDate, toDate);
            }
        }, [fromDate, toDate, fetchedAcceptances]);


        const formatDate=(dateString:string)=>{
            const date = new Date(dateString);
            const formatedDate = date.toLocaleDateString('en-GB');
            return formatedDate;
        }

        const handlePrintPreview = async (patientAcceptanceId: number) => {
            try {
                const acceptanceResponse = await fetchAcceptanceById(patientAcceptanceId);
                const acceptanceData = acceptanceResponse.data.item;
                console.log(acceptanceData)
                const report = await getReportByAcceptance(patientAcceptanceId) || { reportDescription: 'No report available' };
                console.log(report)
    
                // const content = `
                //     <div id="print-content">
                //         <h2>Acceptance Details</h2>
                //         <p><strong>Doctor Name:</strong> ${acceptanceData.doctorName}</p>
                //         <p><strong>Patient Name:</strong> ${acceptanceData.patientName}</p>
                //         <p><strong>DateTime:</strong> ${formatDate(acceptanceData.dateTimeOfAcceptance)}</p>
                //         <p><strong>Urgent Acceptance:</strong> ${acceptanceData.urgentAcceptance ? "Yes" : "No"}</p>
                //         <h3>Report Details</h3>
                //         <div style="white-space: pre-wrap; word-wrap: break-word;">
                //     <p>${report.reportDescription}</p>
                // </div>
                //         <h4>Report date</h4>
                //         <p>${formatDate(report.dateTimeOfReport)}</p>
                //     </div>
                // `;
    
                // // Create a temporary container for the content
                // const div = document.createElement('div');
                // div.innerHTML = content;
                // document.body.appendChild(div);
    
                // // Convert the content to canvas
                // const canvas = await html2canvas(div);
                // const imgData = canvas.toDataURL('image/png');
    
                // // Create a PDF document
                // const pdf = new jsPDF();
                // pdf.addImage(imgData, 'PNG', 10, 20, 380, 200);
    
                // // Create a Blob from the PDF and generate a URL
                // const pdfBlob = pdf.output('blob');
                // const pdfUrl = URL.createObjectURL(pdfBlob);
    
                // // Open the PDF in a new window
                // window.open(pdfUrl, '_blank');
    
                // // Remove the temporary container
                // document.body.removeChild(div);
                const content = `
            <div id="print-content" style="font-family: Arial, sans-serif; margin: 20px;">
                <h2 style="text-align: center;">Acceptance Details</h2>
                <p><strong>Doctor Name:</strong> ${acceptanceData.doctorName}</p>
                <p><strong>Patient Name:</strong> ${acceptanceData.patientName}</p>
                <p><strong>DateTime:</strong> ${formatDate(acceptanceData.dateTimeOfAcceptance)}</p>
                <p><strong>Urgent Acceptance:</strong> ${acceptanceData.urgentAcceptance ? "Yes" : "No"}</p>
                <h3>Report Details</h3>
                <div style="white-space: pre-wrap; word-wrap: break-word; margin-bottom: 10px;">
                    <p>${report.reportDescription}</p>
                </div>
                <h4>Report date</h4>
                <p>${formatDate(report.dateTimeOfReport)}</p>
            </div>
        `;

        // Create a temporary container for the content
        const div = document.createElement('div');
        div.innerHTML = content;
        document.body.appendChild(div);

        // Convert the content to canvas
        const canvas = await html2canvas(div, { scale: 2 }); // Increase scale for better quality

        // Create a PDF document
        const pdf = new jsPDF('l', 'mm', 'a4'); // Specify document format as A4
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG format for better quality

        // Calculate height to ensure entire content fits on the PDF
        const pdfHeight = (canvas.height * 210) / canvas.width; // 210mm is A4 height in mm
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, pdfHeight);

        const pdfBlob = pdf.output('blob');

        // Generate a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new window/tab for preview
        window.open(pdfUrl, '_blank');

        // Remove the temporary container
        document.body.removeChild(div);
            } catch (error) {
                console.error('Error fetching acceptance details:', error);
            }
        };

        return (
            <div>
                <section className='doctor-search p-3'>
                    <div className="container">
                        <div className="grid">
                            <div className="row">
                                <div className="col">
                                    <p className="h3">
                                        <button className='btn btn-primary mx-2 float-start' onClick={() => navigate(NAVIGATE.HOME)}>Back</button>
                                        Acceptances List
                                        <button onClick={() => navigate(NAVIGATE.ACCEPTANCES_MANAGE, { state: { patientAcceptanceId: null } })} className='btn btn-primary ms-2'>
                                            New
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <form className='row'>
                                        <div className="col">
                                            <p>Select From Date</p>
                                            <div className="mb-2">
                                                <input
                                                    type="date"
                                                    name='fromDate'
                                                    value={fromDate}
                                                    className='form-control'
                                                    onChange={handleInputChange}
                                                    placeholder='From Date'
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                        <p>Select To Date</p>
                                            <div className="mb-2">
                                                <input
                                                    type="date"
                                                    name='toDate'
                                                    value={toDate}
                                                    className='form-control'
                                                    onChange={handleInputChange}
                                                    placeholder='To Date'
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {loading ? (
                    <div className="loading">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    <section>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Doctor Code</th>
                                    <th>Patient Name</th>
                                    <th>DateTime</th>
                                    <th>Urgent Acceptance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptances.map((acceptance: Acceptance) => (
                                    <tr
                                        key={acceptance.patientAcceptanceId}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(NAVIGATE.ACCEPTANCES_MANAGE, { state: { patientAcceptanceId: acceptance.patientAcceptanceId } })}
                                    >
                                        <td>{acceptance.doctorName}</td>
                                        <td>{acceptance.doctorCode}</td>
                                        <td>{acceptance.patientName}</td>
                                        <td>{formatDate(acceptance.dateTimeOfAcceptance)}</td>
                                        <td>{acceptance.urgentAcceptance ? "Yes" : "No"}</td>
                                        <td>
                                        <button className="btn btn-primary" onClick={() => handlePrintPreview(acceptance.patientAcceptanceId)}>Print Preview</button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
    </div>
  );
}
export default GetAcceptances
