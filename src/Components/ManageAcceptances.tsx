import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AcceptanceManageProps } from '../interfaces/AcceptanceInterface';
import { createAcceptance, updateAcceptanceById } from '../services/GetAcceptancesService';
import { API_PATHS, NAVIGATE } from '../utils/constants';
import DeleteModal from '../Modals/DeleteModal';
import { Doctor } from '../interfaces/DoctorInterface';
import { Patient } from '../interfaces/PatientInterface';
import { GetDoctorsList } from '../services/GetDoctorsService';
import { getPatients } from '../services/GetPatientsService';
import DateErrorModal from '../Modals/DateCheckModal';

const ManageAcceptances = ({acceptance, params, setAcceptance,initialAcceptanceValue }:AcceptanceManageProps) => {
    const navigate = useNavigate();
    const[isView, setisView]= useState<boolean>(true);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [showDateErrorModal, setShowDateErrorModal] = useState(false);

    const handleInput=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const { name, value } = e.target;
    console.log(`Input change: ${name} = ${value}`);
        if (name==='doctorId'){
            const selectedDoctor = doctors.find(doctor=>doctor.doctorId===parseInt(value))
            if(selectedDoctor){
                setAcceptance((prevState)=>({
                    ...prevState,
                    doctorId:selectedDoctor.doctorId,
                    doctorName:selectedDoctor.doctorName
                }))
            }
        }
        else if(name==='patientId'){
            const selectedPatient = patients.find(patient=>patient.patientId===parseInt(value))
            if (selectedPatient){
                setAcceptance((prevState)=>({
                    ...prevState,
                    patientId:selectedPatient.patientId,
                    patientName:selectedPatient.patientName
                }))
            }
        }
        else {
            setAcceptance(prevState => ({
                ...prevState,
                [name]:  value
            }));
        }
        
    
    }

    const handleDateInput=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= e.target;
        const currentDate = new Date();
        const selectedDate = new Date(value)
        if(selectedDate<currentDate){setShowDateErrorModal(true)}
        //console.log(`Input change: ${name} = ${value}`);
        else {
            setAcceptance((prevState)=>({
                ...prevState, [name]:value,
            }))
        }
        
    }

    useEffect(()=>{
        fetchDoctorsAndPatients();
    },[])

    const fetchDoctorsAndPatients= async()=>{
        const doctorsList = GetDoctorsList({});
        const allDoctors = (await doctorsList).data.data;
        const specialistDoctors = allDoctors.filter((doctor:Doctor)=>doctor.title==0);
        console.log(specialistDoctors)
        setDoctors(specialistDoctors)
        const patientsList = getPatients({});
        setPatients((await patientsList).data.data)
    }
    
    // useEffect(()=>{
    //         setAcceptance((prevState)=>({...prevState,title:0,}))
    //     },[setAcceptance]);

    const submitForm=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(params.patientAcceptanceId){updateAcceptanceById(acceptance,acceptance.patientAcceptanceId);console.log(acceptance)} else{createAcceptance(acceptance); }
        navigate(NAVIGATE.ACCEPTANCES,{state:{updated:true}})
    }
    
    const cancelEdit=()=>{
        setAcceptance(initialAcceptanceValue.current)
        return setisView(true)
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
    };
    const urgentAcceptanceHelper = params.patientAcceptanceId ===null;
  return(
  <div>
    <section className='add-acceptance p-3'>
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className='h3 text-success'>{isView && params.patientAcceptanceId ? "View Acceptance" 
                    : params.patientAcceptanceId && !isView ? (<p className='h3 text-success'>Edit Acceptance</p>) 
                    :<p className='h3 text-success'>Create Acceptance</p> }</p>                   
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="mb-2 fw-bolder">
                            <label>Doctor Name</label>
                            <select name="doctorId" 
                                    required
                                    id="" className='form-control'
                                    disabled={params.patientAcceptanceId ? isView: false}
                                    value={acceptance.doctorId || ''}
                                    onChange={handleInput}><option value="" disabled>Select doctor</option>{doctors.map((doctor)=>(
                                        <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option>
                                    ))}</select>
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Patient Name</label>
                            <select name="patientId"
                                    required
                                    id=''
                                    className='form-control'
                                    disabled={params.patientAcceptanceId ? isView : false}
                                    value={acceptance.patientId || ''}
                                    onChange={handleInput}><option value="" disabled>Select patient</option>{patients.map((patient)=>(
                                        <option key={patient.patientId} value={patient.patientId}>{patient.patientName}</option>
                                    ))}</select>
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>Urgent Acceptance</label>
                            <select 
                            required name='urgentAcceptance' 
                            className='form-control' 
                            disabled={params.patientAcceptanceId ? isView : false}
                            value={acceptance.urgentAcceptance.toString()}
                            onChange={handleInput}><option value="" disabled>Select urgency</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                            </select>
                        </div>
                        <div className="mb-2 fw-bolder">
                            <label>DateTime of the Acceptance</label>
                            <input 
                            type="date"
                            required
                            name='dateTimeOfAcceptance'
                            className='form-control'
                            disabled ={params.patientAcceptanceId ? isView : false}
                            value={formatDate(acceptance.dateTimeOfAcceptance)}
                            onChange={handleDateInput} />
                        </div>
                        <div className="mb-2 fw-bolder">
                            {isView &&params.patientAcceptanceId ? (<button className='btn btn-primary' type='button' onClick={()=>{setisView(false)}}>
                                Edit
                                </button>) : null}
                            {!isView || !params.patientAcceptanceId ? (<button className='btn btn-primary' type='submit'>
                                Save
                            </button>) : null}
                            {!isView ? (<button className='btn btn-danger ms-2' type='button' data-bs-toggle='modal'
                                        data-bs-target='#modal'>
                                Delete
                            </button>) : null}
                            {isView || params.patientAcceptanceId  ? (<button className='btn btn-primary ms-2' type='button' onClick={!isView ? cancelEdit : ()=>navigate(NAVIGATE.ACCEPTANCES)}>
                                {!isView ? "Cancel" : "Close"}
                            </button>) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
        <DeleteModal 
        id={acceptance.patientAcceptanceId} 
        tableName={API_PATHS.ACCEPTANCE}/>
        <DateErrorModal
        show={showDateErrorModal}
        onClose={() => setShowDateErrorModal(false)}
      />
        </div>
    );
}

export default ManageAcceptances