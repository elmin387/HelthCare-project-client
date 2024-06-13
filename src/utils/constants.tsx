export const API_URL = 'https://localhost:7048';

export const API_PATHS = {
    PATIENTS: '/api/Patient/PatientsList',
    PATIENT: '/api/Patient/',
    NEWPATIENT:'/api/Patient/AddPatient',
    DOCTORS: '/api/doctor/DoctorsList',
    DOCTOR: '/api/doctor/',
    NEWDOCTOR:'/api/doctor',
    ACCEPTANCES: '/api/Acceptance',
    ACCEPTANCE: '/api/Acceptance/',
    NEWACCEPTANCE:'/api/Acceptance'}
    

    export const NAVIGATE = {
        HOME: '/',
        PATIENTS: '/patients',
        PATIENTS_MANAGE: '/patients/manage',
        DOCTORS: '/doctors',
        DOCTORS_MANAGE: '/doctors/manage',
        ACCEPTANCES: '/acceptances',
        ACCEPTANCES_MANAGE: '/acceptances/manage',
        BACK: -1,
      }