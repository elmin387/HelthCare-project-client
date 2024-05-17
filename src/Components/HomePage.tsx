import 'bootstrap/dist/css/bootstrap.min.css';
import { relative } from 'path';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const buttonStyle = {
        top:'50px',
        left:'50px',
        marginTop:'20px'
    }
  return (
    <Link to="/patients"><button type="button" className="btn btn-primary" style={buttonStyle}>Patients</button></Link>
    

  )
}
