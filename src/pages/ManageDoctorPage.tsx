import React, { useEffect, useRef, useState } from 'react'
import ManageDoctor from '../Components/ManageDoctor'
import { useLocation } from 'react-router-dom'
import { Doctor } from '../interfaces/DoctorInterface';
import { fetchDoctorById } from '../services/GetDoctorsService';

const initialDoctor = {
  doctorId:0,
  doctorName:'',
  title:0,
  lastName:'',
  code:''
}
const ManageDoctorPage = () => {
  const initialDoctorValue = useRef<Doctor>({}as Doctor)
  const location = useLocation();
  const params = location.state as Doctor;
  const[doctor, setDoctor]=useState<Doctor>(initialDoctor)

  useEffect(()=>{
    if(params.doctorId !==null){
      fetchDoctorById(params.doctorId).then((response)=>{setDoctor(response.data.item)
      initialDoctorValue.current=response.data.item;
    })}
  },[params, setDoctor])

  return (
    <ManageDoctor params={params} doctor={doctor} setDoctor={setDoctor} initialDoctorValue={initialDoctorValue} />
  )
}

export default ManageDoctorPage