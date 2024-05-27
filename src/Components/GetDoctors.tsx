import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAVIGATE } from '../utils/constants';
import { Doctor, DoctorProps } from '../interfaces/DoctorInterface';
import ClipLoader from 'react-spinners/ClipLoader';

const GetDoctors = ({doctors, searchName, handleInputChange,searchFormSubmit, loading}: DoctorProps) => {
    
    const navigate = useNavigate();
  return (
    <div>
        <section className='doctor-search p-3'>
            <div className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col"> 
                            <p className="h3"><button className='btn btn-primary mx-2 float-start' onClick={()=>navigate(NAVIGATE.HOME)}>Back</button>
                                Doctors List
                                <button onClick={()=>navigate(NAVIGATE.DOCTORS_MANAGE,{state:{doctorId:null}})} className='btn btn-primary ms-2'>
                                    New
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form  className='row' onSubmit={searchFormSubmit}>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="text"
                                        name='doctorName'
                                        value={searchName}
                                        className='form-control'
                                        onChange={handleInputChange}
                                        placeholder='Search Doctors' />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="submit"
                                        name='doctorName'
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
                </div> : (
                <section>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Last Name</th>
                        <th>Code</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor:Doctor)=>(
                        <tr key={doctor.doctorId}
                        style={{cursor:"pointer"}}
                        onClick={()=>{navigate(NAVIGATE.DOCTORS_MANAGE,{state:{doctorId:doctor.doctorId}})}}>
                            <td>{doctor.doctorName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.code}</td>
                            <td>{doctor.title==0 ? "Specialist" : (doctor.title==1) ? "SpecialistIntership" : "Nurse"}</td>
                        </tr>
                    ))}
                </tbody>
                    </table>
                        </section>)}
                </div>
                )

            }
export default GetDoctors
            

