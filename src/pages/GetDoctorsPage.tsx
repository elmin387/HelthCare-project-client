import React, { useEffect, useState } from 'react'
import GetDoctors from '../Components/GetDoctors'
import { Doctor } from '../interfaces/DoctorInterface'
import { useLocation } from 'react-router-dom'
import { GetDoctorsList } from '../services/GetDoctorsService'

const GetDoctorsPage = () => {
  const location = useLocation();
  const[searchName, setSearchName] = useState(location.state?.doctorName || '');
const[doctors, setDoctors] = useState<Doctor[]>([])
const [loading, setLoading] =useState(false);

const fetchedDoctors =(query:string)=>{
  setLoading(true)
  GetDoctorsList({name:query}).then((response)=>{const filteredDoctors=response.data.data;setDoctors(response.data.data);setLoading(false)})
  
}

useEffect(()=>{
    fetchedDoctors(searchName)
    }
,[location.state, searchName])

const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
  setSearchName(e.target.value)
}
const searchFormSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  fetchedDoctors(searchName);
}
  return (
    <GetDoctors doctors={doctors} handleInputChange={handleInputChange} searchName={searchName} searchFormSubmit={searchFormSubmit} loading={loading} />
  )
}

export default GetDoctorsPage