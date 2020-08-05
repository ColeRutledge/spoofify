import React, { useState } from 'react'
import UserContext from './context/UserContext'

import Routes from './components/Routes'


function App() {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
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
    volume,
    setVolume
  }

  return (
    <UserContext.Provider value={context} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App
