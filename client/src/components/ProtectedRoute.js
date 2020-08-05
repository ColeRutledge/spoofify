import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import UserContext from '../context/UserContext'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(UserContext)

  return (
    <Route {...rest} render={(props) => (
      !auth ? <Redirect to='/login' /> : <Component {...props} />)} />
  )
}

export default ProtectedRoute
