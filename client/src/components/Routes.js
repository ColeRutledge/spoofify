import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../components/Landing'
import NavBar from '../components/NavBar'
import Users from '../components/Users'
import Login from '../components/Login'
import Register from '../components/Register'
import ProtectedRoute from './ProtectedRoute'
// import PlayBar from './PlayBar'


const Routes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <PlayBar /> */}
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <ProtectedRoute path='/users' component={Users}/>
      </Switch>
    </BrowserRouter>
  )
}


export default Routes
