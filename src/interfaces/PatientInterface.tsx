import { MutableRefObject, SetStateAction } from "react";

export type Patient = {
    patientId: number;
    patientName: string;
    gender: number; // Assuming 0 for male, 1 for female
    address: string;
    telephone: string;
  }
  export type PatientManageProps = {
    patient: Patient
    params: Patient
    setPatient: (value: SetStateAction<Patient>) => void
    initialPatientValue: MutableRefObject<Patient>
  }

  export type PatientRequest = {
    patientId?: number
    name?: string
    pageSize?: number
  }

  export type PatientsProps = {
    patients: Patient[]
    fetchPatients: (name: string) => void
    loading: boolean
  }
