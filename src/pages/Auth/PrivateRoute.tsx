import React, { useContext } from 'react'
import { UserContext } from '../../Components/HealthCareContext/HealthCareContext'
import { Navigate, Outlet } from 'react-router-dom'
import { NAVIGATE } from '../../utils/constants'

const PrivateRoute = () => {
    const { userAuth } = useContext(UserContext)
  return userAuth.token ? <Outlet /> : <Navigate to={NAVIGATE.LOGIN} />
}

export default PrivateRoute