import React, { useContext, useState } from 'react'
import { Login } from '../../interfaces/AuthInterface'
import { loginUser } from '../../services/AuthService'
import { NAVIGATE, STATUS_CODES, USER_AUTH_LOCAL_STORAGE } from '../../utils/constants'
import { ResponseInfo } from '../../interfaces/types'
import { UserContext } from '../HealthCareContext/HealthCareContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Alert} from '../Alert/Alert'
import './LoginForm.css';

const LoginForm = () => {
 const[loading, setLoading] = useState<boolean>();
const[loginResponse, setLoginResponse] = useState<ResponseInfo>({
    status:'',
    message:''
})
const { setUserAuth } = useContext(UserContext);
const navigate = useNavigate();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>()
  const login = (data: Login) => {
    setLoading(true)
    setLoginResponse({ message: '', status: '' })
    handleLogin(data)
  }
    const handleLogin= async (data:Login)=>{
        await loginUser(data).then((response)=>{
            if(response.status==STATUS_CODES.SUCCESS){
                const userAuth= {
                    email:response.data.email,
                    role:response.data.role,
                    token:response.data.token,
                    isFirstLogin: localStorage.getItem(USER_AUTH_LOCAL_STORAGE) ? false : true,
                }
                localStorage.setItem(USER_AUTH_LOCAL_STORAGE, JSON.stringify(userAuth))
                setUserAuth(userAuth)
                navigate(NAVIGATE.HOME)
            }
        })
    }
    
  return (
    <div className='form-bg'>
      <form onSubmit={handleSubmit(login)} className='form-container'>
        <div className='form-icon'>
          <div className='form-logo'></div>
        </div>
        <h3 className='title'>Login</h3>
        <div className='form-group'>
          <span className='input-icon'>
            <i className='fa fa-envelope'></i>
          </span>
          <input
            className='form-control'
            placeholder='Email'
            type='mail'
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email is not correct'
              },
              onChange: () => setLoginResponse({ message: '', status: '' }),
            })}
          />
          {errors.email && <div className='error_message'>{errors.email.message}</div>}
        </div>
        <div className='form-group'>
          <span className='input-icon'>
            <i className='fa fa-lock'></i>
          </span>
          <input
            type='password'
            className='form-control'
            placeholder="Password"
            {...register('password', {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <div className='error_message'>{errors.password.message}</div>
          )}
        </div>
        <button className='btn signin'>
          Login
          {loading && (
            <span className='spinner-border spinner-border-sm mx-2'></span>
          )}
        </button>
        <div className='forgot-pass'>
          <p className='mb-0'>
            Do you have an account? <br />
            <Link to='/register'>Register here!</Link>
            <Alert message={loginResponse.message} status={loginResponse.status} />
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm