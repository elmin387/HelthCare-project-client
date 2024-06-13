
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
import GetAcceptancesPage from './pages/GetAcceptancesPage';
import ManageAcceptancePage from './pages/ManageAcceptancePage';

function App() {
  return (
      <Router>
          <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/patients' element={<GetPatientsPage />}/>
          <Route path='/patients/manage' element={<ManagePatientPage />}/>
          <Route path='/doctors' element={<GetDoctorsPage />} />
          <Route path='/doctors/manage' element={<ManageDoctorPage />} />
          <Route path='/acceptances' element={<GetAcceptancesPage />} />
          <Route path='/acceptances/manage' element={<ManageAcceptancePage />} />
          </Routes>
      </Router>
  );
}

export default App;
