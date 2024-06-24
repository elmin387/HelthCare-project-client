import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Acceptance } from '../interfaces/AcceptanceInterface';
import { debounce } from '../services/CommonServices';
import { GetAcceptanceList } from '../services/GetAcceptancesService';
import GetAcceptances from '../Components/GetAcceptances';

const GetAcceptancesPage = () => {
  const location = useLocation();
const[acceptances, setAcceptances] = useState<Acceptance[]>([])
const [loading, setLoading] =useState(false);


const fetchedAcceptances =useCallback(
  debounce((fromDate:string='', toDate:string='')=>{
  setLoading(true);
  GetAcceptanceList({fromDate,toDate})
  .then((response)=>{setAcceptances(response.data.data);
    setLoading(false);
  });
},500),
[]
);

useEffect(()=>{
    fetchedAcceptances()
    }
,[])
  return (
    <GetAcceptances acceptances={acceptances} fetchedAcceptances={fetchedAcceptances} loading={loading} />
  )
}

export default GetAcceptancesPage