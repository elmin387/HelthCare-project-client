import React, { useEffect, useRef, useState } from 'react'
import { Acceptance } from '../interfaces/AcceptanceInterface';
import { useLocation } from 'react-router-dom';
import { fetchAcceptanceById } from '../services/GetAcceptancesService';
import ManageAcceptances from '../Components/ManageAcceptances';

const initialAcceptance = {
        patientAcceptanceId:0,
        dateTimeOfAcceptance:'',
        patientId:0,
        patientName:'',
        doctorId:0,
        doctorName:'',
        doctorCode:'',
        urgentAcceptance:true
  }
const ManageAcceptancePage = () => {
    const initialAcceptanceValue = useRef<Acceptance>({}as Acceptance)
    const location = useLocation();
    const params = location.state as Acceptance;
    const[acceptance, setAcceptance]=useState<Acceptance>(initialAcceptance)
  
    useEffect(()=>{
      if(params.patientAcceptanceId !==null){
        fetchAcceptanceById(params.patientAcceptanceId).then((response)=>{setAcceptance(response.data.item)
        initialAcceptanceValue.current=response.data.item;
      })} else {
        setAcceptance(initialAcceptance);
      }
    },[params])
  
    return (
      <ManageAcceptances params={params || {patientAcceptanceId:null}} 
                        acceptance={acceptance} 
                        setAcceptance={setAcceptance} 
                        initialAcceptanceValue={initialAcceptanceValue} />
    )
}

export default ManageAcceptancePage