import 'bootstrap/dist/css/bootstrap.min.css';
import { relative } from 'path';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const buttonStyle = {
        top:'50px',
        left:'50px',
        marginTop:'20px',
        marginLeft:'20px'
    }
  return (<div>
    <Link to="/patients"><button type="button" className="btn btn-primary" style={buttonStyle}>Patients</button></Link>
    <Link to="/doctors"><button type="button" className="btn btn-primary" style={buttonStyle}>Doctors</button></Link>
    <Link to="/acceptances"><button type="button" className="btn btn-primary" style={buttonStyle}>Acceptances</button></Link>
    </div>

  )
}
