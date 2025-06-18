import React from 'react'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({children}) => {
    const data = JSON.parse(localStorage.getItem('data')) || {};
    const user = data.user ? data.user : '' ;
    const token = data.token ? data.token : '';
  
    return user !='' && token != '' ? children : <Navigate to='/login'></Navigate>
  
}

export default ProtectedRoutes