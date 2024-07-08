import React, { useContext, useEffect, useState } from 'react'
import { ResponseInfo } from '../../interfaces/types'
import { UserContext } from '../../Components/HealthCareContext/HealthCareContext'
import { useSearchParams } from 'react-router-dom'
import { emailConfirmation } from '../../services/AuthService'
import { STATUS_CODES, STATUS_TYPES } from '../../utils/constants'
import { Alert } from '../../Components/Alert/Alert'
import LoginForm from '../../Components/Auth/LoginForm'

const Login = () => {
    const [verificationResponse, setVerificationResponse] = useState<ResponseInfo>({
        status: '',
        message: '',
      })
      const { userAuth } = useContext(UserContext);
      console.log(userAuth.token);
      const [searchParams, setSearchParams] = useSearchParams()
      const code = searchParams.get('code')
      const userId = searchParams.get('userId')
      useEffect(() => {
        if (userId && code) {
          verifyUser(userId, code)
        }
      }, [])

      const verifyUser = async (userId: string, code: string) => {
        const responseMessage = await emailConfirmation({ userId, code })
    
        if (responseMessage.status === STATUS_CODES.SUCCESS) {
          setVerificationResponse({
            status: STATUS_TYPES.SUCCESS,
            message: 'Email verified',
          })
        } else {
          setVerificationResponse({
            status: STATUS_TYPES.ERROR,
            message: 'Email not verified',
          })
        }
    
        setSearchParams({})
      }
  return (
    <div className='container-fluid container-login'>
      {userAuth.token ? (
        <h1 className='text-center'>You are logged in.</h1>
      ) : (
        <>
          <Alert message={verificationResponse.message} status={verificationResponse.status} />
          <LoginForm />
        </>
      )}
    </div>
  )
}

export default Login
