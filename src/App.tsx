
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import GetPatientPage from './pages/ManagePatientPage';
import GetPatientsPage from './pages/GetPatientsPage';
import ManagePatient from './Components/ManagePatient';
import ManagePatientPage from './pages/ManagePatientPage';

function App() {
  return (
      <Router>
          <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/patients' element={<GetPatientsPage />}/>
          <Route path='/patients/manage' element={<ManagePatientPage />}/>
          </Routes>
      </Router>
  );
}

export default App;
