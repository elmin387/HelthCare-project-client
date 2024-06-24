import { AxiosResponse } from "axios";
import { customAxios } from "../axios/axios";
import { API_PATHS, API_URL } from "../utils/constants";
import { Doctor, DoctorRequest } from "../interfaces/DoctorInterface";
import { Acceptance, AcceptanceRequest } from "../interfaces/AcceptanceInterface";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const GetAcceptanceList= async(obj:AcceptanceRequest):Promise<AxiosResponse>=>{ 
    //await delay(2000);
    return customAxios.get(API_PATHS.ACCEPTANCES,{
        params:{
            acceptanceId:obj?.patientAcceptanceId,
            name:obj?.name,
            fromDate: obj?.fromDate,
            toDate: obj?.toDate,
            pageSize:obj?.pageSize
        }
    })}; 

export const fetchAcceptanceById= async(id:number):Promise<AxiosResponse>=>{
    return customAxios.get(API_PATHS.ACCEPTANCE+id);
}

export const updateAcceptanceById = async(acceptance:Acceptance, id:number):Promise<AxiosResponse>=>{console.log(acceptance)
    return customAxios.put(API_PATHS.ACCEPTANCE+ id, acceptance)
}

// export const createAcceptance= async(acceptance:Acceptance):Promise<AxiosResponse>=>{
//     console.log(acceptance)
//     return await customAxios.post(API_PATHS.NEWACCEPTANCE, acceptance)
// }

export const createAcceptance = async (acceptance:Acceptance) => {
    try {
      const response = await customAxios.post(API_PATHS.NEWACCEPTANCE, acceptance);
      return response;
    } catch (error:any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
      console.error('Error config:', error.config);
  
      // Retry logic could be implemented here based on the error type
  
      throw error; // Rethrow the error to propagate it further
    }
  };