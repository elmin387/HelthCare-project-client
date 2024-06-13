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

export const createAcceptance= async(acceptance:Acceptance):Promise<AxiosResponse>=>{
    return customAxios.post(API_PATHS.NEWACCEPTANCE, acceptance)
}