import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Patient, PatientsProps } from '../interfaces/PatientInterface'
import { Link, useNavigate } from 'react-router-dom'
import { getPatients } from '../services/GetPatientsService'
import { NAVIGATE } from '../utils/constants'
import '../Components/GetPatients.css'; // Import your stylesheet
import ClipLoader from 'react-spinners/ClipLoader'

const GetPatients = ({patients, fetchPatients, loading}:PatientsProps) => {
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const{name,value}=event.target;
        console.log(event.target.value)
        setSearchName(value);
        fetchPatients(value);
    };
  return(
    <div>
        <section className='patient-search p-3'>
            <div className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            
                            <p className="h3"><button className='btn btn-primary mx-2 float-start' onClick={()=>navigate(NAVIGATE.HOME)}>Back</button>
                                Patient List
                                <button onClick={()=>navigate(NAVIGATE.PATIENTS_MANAGE,{state:{patientId:null}})} className='btn btn-primary ms-2'>
                                    New
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form  className='row'>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="text"
                                        name='patientName'
                                        value={searchName}
                                        className='form-control'
                                        onChange={handleInputChange}
                                        placeholder='Search Patients' />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="submit"
                                        name='patientName'
                                        value='Search'
                                        className='btn btn-outline-dark' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {loading ? <div className="loading">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div> : (<section>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Address</th>
                        <th>Telephone</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient:Patient)=>(
                        <tr key={patient.patientId}
                        style={{cursor:"pointer"}}
                        onClick={()=>{navigate(NAVIGATE.PATIENTS_MANAGE,{state:{patientId:patient.patientId}})}}>
                            <td>{patient.patientName}</td>
                            <td>{patient.address}</td>
                            <td>{patient.telephone}</td>
                            <td>{patient.gender==0 ? "Male" : (patient.gender==1) ? "Female" : "Unknown"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>)}
    </div>
  )
}

export default GetPatients;