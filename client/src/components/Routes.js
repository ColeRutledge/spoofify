import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import PlayBar from './PlayBar'
import Users from './Users'
import Login from './Login'
import Register from './Register'
import Catalog from './Catalog'
import ProtectedRoute from './ProtectedRoute'
import Library from './Library'


const Routes = () => {
  return (
    <>
      <NavBar />
      <PlayBar />
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path='/logout' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <Route path='/catalog' render={() => <Catalog />} />
        <ProtectedRoute path='/users' component={Users} />
        <ProtectedRoute path='/library' component={Library} />
      </Switch>
    </>
  )
}


export default Routes
