import React, { ChangeEvent, useEffect, useState } from 'react'
import { PatientManageProps } from '../interfaces/PatientInterface';
import { DoctorManageProps, DoctorProps } from '../interfaces/DoctorInterface';
import DeleteModal from '../Modals/DeleteModal';
import { API_PATHS, NAVIGATE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { createDoctor, updateDoctorById } from '../services/GetDoctorsService';

const ManageDoctor = ({params,doctor,setDoctor,initialDoctorValue }:DoctorManageProps) => {
    const navigate = useNavigate();
    const[isView, setisView]= useState<boolean>(true);

    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name, value}= e.target;
        console.log(e.target.value)
        setDoctor((prevState)=>{
            return {...prevState,[name]:value}
        })
    
    }
    
    useEffect(()=>{
        if(!doctor.title){
            setDoctor((prevState)=>({...prevState,title:0,}))
        }
    },[setDoctor,doctor.title]);

    const submitForm=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(params.doctorId){updateDoctorById(doctor,doctor.doctorId)} else{createDoctor(doctor); }
        navigate(NAVIGATE.DOCTORS,{state:{updated:true}})
    }
    const handleInput2=(e:ChangeEvent<HTMLSelectElement>)=>{
            const{name, value}= e.target;
            setDoctor((prevState)=>{
                return {...prevState, [name]:parseInt(value,10)}
            })
    }
    const cancelEdit=()=>{
        setDoctor(initialDoctorValue.current)
        return setisView(true)
    }
    
  return(
  <div>
    <section className='add-doctor p-3'>
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className='h3 text-success'>{isView && params.doctorId ? "View Doctor" 
                    : params.doctorId && !isView ? (<p className='h3 text-success'>Edit Doctor</p>) 
                    :<p className='h3 text-success'>Create Doctor</p> }</p>                   
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="mb-2 fw-bolder">
                            <label>Doctor Name</label>
                            <input 
                            type="text"
                            required
                            name='doctorName'
                            className='form-control'
                            disabled ={params.doctorId ? isView : false}
                            value={doctor.doctorName}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Last Name</label>
                            <input 
                            type="text"
                            required
                            name='lastName'
                            className='form-control'
                            disabled ={params.doctorId ? isView : false}
                            value={doctor.lastName}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Code</label>
                            <input 
                            type="text"
                            required
                            name='code'
                            className='form-control'
                            disabled ={params.doctorId ? isView : false}
                            value={doctor.code}
                            onChange={handleInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Title</label>
                            <select
                            required
                            name='title'
                            className='form-control'
                            disabled ={params.doctorId ? isView : false}
                            value={doctor.title}
                            onChange={handleInput2}><option value='0'>Specialist</option><option value='1'>Specialist Internship</option><option value='2'>Nurse</option></select>
                        </div>
                        <div className="mb-2 fw-bolder">
                            {isView &&params.doctorId ? (<button className='btn btn-primary' type='button' onClick={()=>{setisView(false)}}>
                                Edit
                                </button>) : null}
                            {!isView || !params.doctorId ? (<button className='btn btn-primary' type='submit'>
                                Save
                            </button>) : null}
                            {!isView ? (<button className='btn btn-danger ms-2' type='button' data-bs-toggle='modal'
                                        data-bs-target='#modal'>
                                Delete
                            </button>) : null}
                            {isView || params.doctorId  ? (<button className='btn btn-primary ms-2' type='button' onClick={!isView ? cancelEdit : ()=>navigate(NAVIGATE.DOCTORS)}>
                                {!isView ? "Cancel" : "Close"}
                            </button>) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
        <DeleteModal id={doctor.doctorId} tableName={API_PATHS.DOCTOR}/>
        </div>
    );
}

export default ManageDoctor