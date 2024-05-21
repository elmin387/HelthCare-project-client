import React, { useCallback, useEffect, useState } from 'react'
import { Patient } from '../interfaces/PatientInterface'
import { debounce, getPatients } from '../services/GetPatientsService'
import GetPatients from '../Components/GetPatients'
import { useLocation } from 'react-router-dom'

const GetPatientsPage = () => {
    const[patients, setPatients] = useState<Patient[]>([])
    const[loading, setLoading] = useState(false);
    const location = useLocation();

    const fetchPatients = useCallback(
        debounce((searchName: string = '') => {
            setLoading(true);
            getPatients({ name: searchName }).then((response) => {
                setPatients(response.data.data);
                setLoading(false);
            });
        }, 500),
        []
    );

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(()=>{
        getPatients().then((response)=>{
            setPatients(response.data.data)
        })
    },[])
    useEffect(() => {
        fetchPatients(location.state?.patientName || '');
    }, [location.state]);

  return <GetPatients patients={patients} fetchPatients={fetchPatients} loading={loading} />
  
}

export default GetPatientsPage