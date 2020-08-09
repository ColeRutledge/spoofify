import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import PlayBar from './PlayBar'
import Users from './Users'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import Library from './Library'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import UserContext from '../context/UserContext'


const Routes = () => {
  const { auth } = useContext(UserContext)
  return (
    <>
      {auth ? <NavBar /> : <TopNav />}
      {auth ? <PlayBar /> : <BottomNav />}
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path='/logout' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <ProtectedRoute path='/users' component={Users} />
        <ProtectedRoute path='/library' component={Library} />
      </Switch>
    </>
  )
}


export default Routes
