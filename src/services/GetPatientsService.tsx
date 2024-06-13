import axios, { Axios, AxiosResponse } from "axios";
import { Patient, PatientManageProps, PatientRequest } from "../interfaces/PatientInterface";
import { customAxios } from "../axios/axios";
import { API_PATHS } from "../utils/constants";

//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const getPatients = async (obj?:PatientRequest):Promise<AxiosResponse> =>{
    //await delay(2000);
    return await customAxios.get(API_PATHS.PATIENTS,{
        params:{
            patientId:obj?.patientId,
            name:obj?.name,
            pageSize:obj?.pageSize
        }
    })
}
export const fetchPatientById = async (id:number): Promise<AxiosResponse>=> {
return await customAxios.get(API_PATHS.PATIENT+id)
}
export const updatePatientById = async (patient:Patient, id:number):Promise<AxiosResponse> =>{
    return await customAxios.put(API_PATHS.PATIENT + id, patient)
}
export const createPatient = (patient:Patient):Promise<AxiosResponse>=>{
    console.log("Sending patient data", patient);
    return customAxios.post(API_PATHS.NEWPATIENT,patient)
}


