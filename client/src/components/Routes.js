import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../components/Landing'
import NavBar from '../components/NavBar'
import Users from '../components/Users'
import Login from '../components/Login'
import Register from '../components/Register'
import PlayBar from '../components/PlayBar'

const Routes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <PlayBar />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/users' render={() => <Users />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
      </Switch>
    </BrowserRouter>
  )
}


export default Routes
