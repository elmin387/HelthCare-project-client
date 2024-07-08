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
    NEWACCEPTANCE:'/api/Acceptance',
    NEWREPORT:'/api/report',
    GETREPORT:'/api/report'}
    

    export const NAVIGATE = {
        LOGIN: '/login',
        HOME: '/',
        PATIENTS: '/patients',
        PATIENTS_MANAGE: '/patients/manage',
        DOCTORS: '/doctors',
        DOCTORS_MANAGE: '/doctors/manage',
        ACCEPTANCES: '/acceptances',
        ACCEPTANCES_MANAGE: '/acceptances/manage',
        BACK: -1,
      }

// Statuses
export const STATUS_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
}
export const STATUS_CODES = {
  SUCCESS: 200,
  ERROR: 400,
}

export const USER_AUTH_LOCAL_STORAGE = 'UserAuth'
export const ROLES = {
  SUPER_ADMIN: 'SuperAdministrator',
  USER: 'User',
}

export const CLIENT_CONFIRMATION_MAIL_URI = "http://localhost:3000/login/"