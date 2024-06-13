import React, { useCallback, useEffect, useState } from 'react'
import GetDoctors from '../Components/GetDoctors'
import { Doctor } from '../interfaces/DoctorInterface'
import { useLocation } from 'react-router-dom'
import { GetDoctorsList } from '../services/GetDoctorsService'
import { debounce } from '../services/CommonServices'

const GetDoctorsPage = () => {
  const location = useLocation();
const[doctors, setDoctors] = useState<Doctor[]>([])
const [loading, setLoading] =useState(false);

const fetchedDoctors =useCallback(
  debounce((searchName:string='')=>{
  setLoading(true);
  GetDoctorsList({name:searchName})
  .then((response)=>{setDoctors(response.data.data);
    setLoading(false);
  });
},500),
[]
);

useEffect(()=>{
    fetchedDoctors()
    }
,[])


  return (
    <GetDoctors doctors={doctors} fetchedDoctors={fetchedDoctors} loading={loading} />
  )
}

export default GetDoctorsPage