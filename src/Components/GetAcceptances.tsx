    import React, { ChangeEvent, useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom';
    import { GetAcceptanceList } from '../services/GetAcceptancesService';
    import { Acceptance, AcceptanceProps } from '../interfaces/AcceptanceInterface';
    import { NAVIGATE } from '../utils/constants';
    import ClipLoader from 'react-spinners/ClipLoader';

    const GetAcceptances = ({acceptances,fetchedAcceptances, loading}: AcceptanceProps) => {
        const[searchName, setSearchName]=useState('')
        const [fromDate, setFromDate] = useState('');
        const [toDate, setToDate] = useState('');
        const navigate = useNavigate();

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