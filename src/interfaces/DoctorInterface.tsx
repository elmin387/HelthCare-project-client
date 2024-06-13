import { MutableRefObject, SetStateAction } from "react"

export type Doctor ={
        doctorId:number,
        doctorName:string,
        title:number,
        lastName:string,
        code:string,
    }

export type DoctorProps ={
        doctors:Doctor[]
        fetchedDoctors:(name:string)=>void
        loading:boolean

    }

export type DoctorRequest={
    doctorId?: number
    name?: string
    pageSize?: number
}

export type DoctorManageProps = {
    doctor:Doctor
    params: Doctor
    setDoctor: (value: SetStateAction<Doctor>) => void
    initialDoctorValue: MutableRefObject<Doctor>
    
  }
