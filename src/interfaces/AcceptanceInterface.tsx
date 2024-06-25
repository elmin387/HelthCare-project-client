import { MutableRefObject, SetStateAction } from "react"

export type Acceptance ={
        patientAcceptanceId:number,
        dateTimeOfAcceptance:string,
        patientId:number,
        patientName:string,
        doctorId:number,
        doctorName:string,
        doctorCode:string,
        urgentAcceptance:boolean
    }

export type AcceptanceProps ={
        acceptances:Acceptance[]
        acceptance?:Acceptance
        fetchedAcceptances:(fromDate:string,toDate:string)=>void
        loading:boolean
        reportData?:Report

    }

export type AcceptanceRequest={
    patientAcceptanceId?: number
    name?: string
    fromDate?: string
    toDate?: string
    pageSize?: number
}

export type AcceptanceManageProps = {
    acceptance:Acceptance
    params: Acceptance
    setAcceptance: (value: SetStateAction<Acceptance>) => void
    initialAcceptanceValue: MutableRefObject<Acceptance>
    
  }
  export interface Report {
    dateTimeofReport:string
    reportDescription: string;
    // Add other properties as needed
  }

    export interface PrintPreviewProps {
        acceptanceData: Acceptance;
        reportData: Report;
        onClose: () => void;
        onDownload: () => void;
    }
