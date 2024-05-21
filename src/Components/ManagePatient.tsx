import React, { ChangeEvent, useEffect, useState } from 'react'
import { PatientManageProps } from '../interfaces/PatientInterface'
import { createPatient, updatePatientById } from '../services/GetPatientsService';
import { useNavigate } from 'react-router-dom';
import { API_PATHS, NAVIGATE } from '../utils/constants';
import DeleteModal from '../Modals/DeleteModal';

const ManagePatient = ({patient, params, setPatient, initialPatientValue}:PatientManageProps) => {
    const navigate = useNavigate();
    const[isView, setisView]= useState<boolean>(true)
 
  useEffect(()=>{
    if(!patient.gender){
        setPatient((prevState)=>({...prevState, gender:0,}))
  }},[setPatient,patient.gender]);

    const submitForm =(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(params.patientId) {updatePatientById(patient,params.patientId)} else{createPatient(patient)}
            
            navigate(NAVIGATE.PATIENTS,{state:{updated:true}});
    }
   

    const handleInput = (event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=event.target;
        setPatient((prevState)=>{
            return {...prevState,[name]:value}
        })
    }
    const handleInput2 = (event:ChangeEvent<HTMLSelectElement>)=>{
        const{name,value}=event.target;
        setPatient((prevState)=>{
            return {...prevState,[name]:parseInt(value,10)}
        })
    }
    const cancelEdit=()=>{
        setPatient(initialPatientValue.current)
        return setisView(true)
    }
  return (
    <div>
    <section className='add-patient p-3'>
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className='h3 text-success'>{isView && params.patientId ? "View Patient" 
                    : params.patientId && !isView ? (<p className='h3 text-success'>Edit Patient</p>) 
                    :<p className='h3 text-success'>Create Patient</p> }</p>                   
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="mb-2 fw-bolder">
                            <label>Patient Name</label>
                            <input 
                            type="text"
                            required
                            name='patientName'
                            className='form-control'
                            disabled ={params.patientId ? isView : false}
                            value={patient.patientName}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Address</label>
                            <input 
                            type="text"
                            required
                            name='address'
                            className='form-control'
                            disabled ={params.patientId ? isView : false}
                            value={patient.address}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Telephone</label>
                            <input 
                            type="text"
                            required
                            name='telephone'
                            className='form-control'
                            disabled ={params.patientId ? isView : false}
                            value={patient.telephone}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Gender</label>
                            <select
                            required
                            name='gender'
                            className='form-control'
                            disabled ={params.patientId ? isView : false}
                            value={patient.gender}
                            onChange={handleInput2}><option value='0'>Male</option><option value='1'>Female</option><option value='2'>Unknown</option></select>
                        </div>
                        <div className="mb-2 fw-bolder">
                            {isView &&params.patientId ? (<button className='btn btn-primary' type='button' onClick={()=>{setisView(false)}}>
                                Edit
                                </button>) : null}
                            {!isView || !params.patientId ? (<button className='btn btn-primary' type='submit'>
                                Save
                            </button>) : null}
                            {!isView ? (<button className='btn btn-danger ms-2' type='button' data-bs-toggle='modal'
                                        data-bs-target='#modal'>
                                Delete
                            </button>) : null}
                            {isView || params.patientId  ? (<button className='btn btn-primary ms-2' type='button' onClick={!isView ? cancelEdit : ()=>navigate(NAVIGATE.PATIENTS)}>
                                {!isView ? "Cancel" : "Close"}
                            </button>) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
        <DeleteModal id={patient.patientId} tableName={API_PATHS.PATIENT}/>
        </div>
    );
};

export default ManagePatient;