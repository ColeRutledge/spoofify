import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './Landing'
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
    <BrowserRouter>
      <NavBar />
      <PlayBar />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/logout' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <Route path='/catalog' render={() => <Catalog />} />
        <ProtectedRoute path='/users' component={Users} />
        <ProtectedRoute path='/library' component={Library} />
      </Switch>
    </BrowserRouter>
  )
}


export default Routes
