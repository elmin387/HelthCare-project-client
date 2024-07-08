import React, { useContext } from 'react'
import { UserContext } from '../../Components/HealthCareContext/HealthCareContext'
import RegisterForm from '../../Components/Auth/RegisterForm'

const Register = () => {
    const { userAuth } = useContext(UserContext)

  return (
    <div className='container-fluid container-register'>
      {userAuth.token ? (
        <h1 className='text-center'>You are logged in</h1>
      ) : (
        <RegisterForm />
      )}
    </div>
  )
}

export default Register