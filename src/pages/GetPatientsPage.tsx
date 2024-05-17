import React, { useEffect, useState } from 'react'
import { Patient } from '../interfaces/PatientInterface'
import { getPatients } from '../services/GetPatientsService'
import GetPatients from '../Components/GetPatients'

const GetPatientsPage = () => {
    const[patients, setPatients] = useState<Patient[]>([])
    useEffect(()=>{
        getPatients().then((response)=>{
            setPatients(response.data)
        })
    },[])

  return <GetPatients patients={patients} />
  
}

export default GetPatientsPage