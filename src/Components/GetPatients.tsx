import React, { useEffect, useState } from 'react'
import { Patient, PatientsProps } from '../interfaces/PatientInterface'
import { Link, useNavigate } from 'react-router-dom'
import { getPatients } from '../services/GetPatientsService'
import { NAVIGATE } from '../utils/constants'

const GetPatients = ({patients}:PatientsProps) => {
    const navigate = useNavigate();

  return(
    <div>
        <section className='patient-search p-3'>
            <div className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                Patient List
                                <button onClick={()=>navigate(NAVIGATE.PATIENTS_MANAGE,{state:{patientId:null}})} className='btn btn-primary ms-2'>
                                    New
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form action="" className='row'>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="text"
                                        className='form-control'
                                        placeholder='Search Patients' />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="submit"
                                        className='btn btn-outline-dark' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
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
                            <td>{patient.gender==0 ? "Male" : "Female"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default GetPatients;