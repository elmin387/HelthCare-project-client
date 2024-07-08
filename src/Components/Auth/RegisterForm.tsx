import React, { useState } from 'react'
import { ResponseInfo } from '../../interfaces/types';
import { watch } from 'node:fs/promises';
import { Link } from 'react-router-dom';
import { Alert } from '../Alert/Alert';
import { useForm } from 'react-hook-form';
import { Register } from '../../interfaces/AuthInterface';
import { CLIENT_CONFIRMATION_MAIL_URI, STATUS_CODES, STATUS_TYPES } from '../../utils/constants';
import { emailConfirmation, registerUser } from '../../services/AuthService';

const RegisterForm = () => {
    const[loading, setLoading] = useState<boolean>();
    const[registrationResponse, setRegistrationResponse] = useState<ResponseInfo>({
        status:'',
        message:''
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Register>()

      const submitForm = (data: Register) => {
        data.clientConfirmationEmailURI = CLIENT_CONFIRMATION_MAIL_URI
        setLoading(true)
        setRegistrationResponse({ message: '', status: '' })
        handeRegistration(data)
      }

      const handeRegistration = async (data: Register) => {
        await registerUser(data)
          .then(async (response) => {
            if (response.status === STATUS_CODES.SUCCESS) {
              setRegistrationResponse({
                status: STATUS_TYPES.SUCCESS,
                
                message: "You are registrated successfully, Please check your email and verify your account",
              })
            }
          })
          .catch((error) => {
            let message = ''
    
            if (!error?.response) {
              message = "No server response, please try again"
            } else if (error.response.status === STATUS_CODES.ERROR) {
              message = "Email is already taken, please take another email"
            } else {
              message = "Registration failed, please try again"
            }
    
            setRegistrationResponse({
              status: STATUS_TYPES.ERROR,
              message: message,
            })
          })
          .finally(() => {
            setLoading(false)
          })
      }
    
      
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='form-bg'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='form-wrapper'>
              <div className='form-container'>
                <div className='form-icon'>
                  <div className='form-logo'></div>
                </div>
                <div className='form-horizontal'>
                  <h3 className='title'>Register here</h3>
                  <div className='form-group'>
                    <span className='input-icon'>
                      <i className='fa fa-envelope'></i>
                    </span>
                    <input
                      className='form-control'
                      placeholder='Email'
                      type='mail'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email is not correct',
                        },
                        onChange: () => setRegistrationResponse({ message: '', status: '' }),
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
                      placeholder='Password'
                      {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                          message: 'Password is required',
                        },
                      })}
                    />
                    {errors.password && (
                      <div className='error_message'>{errors.password.message}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <span className='input-icon'>
                      <i className='fa fa-unlock-alt'></i>
                    </span>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Confirm your password'
                      {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        validate: (value) =>
                          value === watch('password') ||
                          'Password does not match',
                      })}
                    />
                    {errors.confirmPassword && (
                      <div className='error_message'>{errors.confirmPassword.message}</div>
                    )}
                  </div>
                  <button className='btn signin'>
                    Register
                    {loading ? <span className='spinner-border spinner-border-sm'></span> : null}
                  </button>
                  <span className='forgot-pass'>
                    <p className='mb-0 text-center'>
                      'You have an account'?
                      <br />
                      <Link to='/login'>Login here!</Link>
                      <Alert
                        message={registrationResponse.message}
                        status={registrationResponse.status}
                      />
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm