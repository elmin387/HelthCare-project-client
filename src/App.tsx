
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import GetPatientPage from './pages/ManagePatientPage';
import GetPatientsPage from './pages/GetPatientsPage';
import ManagePatient from './Components/ManagePatient';
import ManagePatientPage from './pages/ManagePatientPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import GetDoctorsPage from './pages/GetDoctorsPage';
import ManageDoctorPage from './pages/ManageDoctorPage';

function App() {
  return (
      <Router>
          <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/patients' element={<GetPatientsPage />}/>
          <Route path='/patients/manage' element={<ManagePatientPage />}/>
          <Route path='/doctors' element={<GetDoctorsPage />} />
          <Route path='/doctors/manage' element={<ManageDoctorPage />} />
          </Routes>
      </Router>
  );
}

export default App;
