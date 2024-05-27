import React, { useEffect, useRef, useState } from 'react'
import { Patient } from '../interfaces/PatientInterface'
import { useLocation, useParams } from 'react-router-dom'
import { fetchPatientById } from '../services/GetPatientsService'
import GetPatient from '../Components/ManagePatient'
import ManagePatient from '../Components/ManagePatient'

const initialPatient ={
    patientId: 0,
    patientName: '',
    gender: 0, // Assuming 0 for male, 1 for female
    address: '',
    telephone: ''
}
const ManagePatientPage = () => {

const initialPatientValue = useRef<Patient>({} as Patient)
const location = useLocation();
const params = location.state as Patient
const[patient, setPatient]=useState<Patient>(initialPatient)

useEffect(()=>{
  if(params.patientId !==null) {
    fetchPatientById(params.patientId)
    .then((response)=>{setPatient(response.data.item)
      initialPatientValue.current=response.data.item;
      
    });
  }
},[params,setPatient])


  return (
    <div>
      <ManagePatient patient={patient} params={params} setPatient={setPatient} initialPatientValue={initialPatientValue} />
    </div>
  )
}

export default ManagePatientPage