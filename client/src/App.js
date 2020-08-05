import React, { useState } from 'react'
import UserContext from './context/UserContext'

import Routes from './components/Routes'


function App() {
  const [ currentTime, setCurrentTime ] = useState('0:00')
  const [ duration, setDuration ] = useState('0:00')
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ auth, setAuth ] = useState(localStorage.getItem('token') || '')


  const context = {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    auth,
    setAuth,
  }

  return (
    <UserContext.Provider value={context} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App
