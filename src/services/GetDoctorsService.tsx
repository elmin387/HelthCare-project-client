import { AxiosResponse } from "axios";
import { customAxios } from "../axios/axios";
import { API_PATHS, API_URL } from "../utils/constants";
import { Doctor, DoctorRequest } from "../interfaces/DoctorInterface";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const GetDoctorsList= async(obj:DoctorRequest):Promise<AxiosResponse>=>{ 
    //await delay(2000);
    return await customAxios.get(API_PATHS.DOCTORS,{
        params:{
            doctorId:obj?.doctorId,
            name:obj?.name,
            pageSize:obj?.pageSize
        }
    })}; 

export const fetchDoctorById= async(id:number):Promise<AxiosResponse>=>{
    return await customAxios.get(API_PATHS.DOCTOR+id);
}

export const updateDoctorById = async(doctor:Doctor, id:number):Promise<AxiosResponse>=>{
    return await customAxios.put(API_PATHS.DOCTOR+ id, doctor)
}

export const createDoctor= async(doctor:Doctor):Promise<AxiosResponse>=>{
    return await customAxios.post(API_PATHS.NEWDOCTOR, doctor)
}