import React, { useState } from 'react'
import UserContext from './context/UserContext'

import Routes from './components/Routes'


function App() {
  const [ currentTime, setCurrentTime ] = useState('0:00')
  const [ duration, setDuration ] = useState('0:00')
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ loggedIn, setLoggedIn ] = useState(false)


  const context = {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    loggedIn,
    setLoggedIn,
  }

  return (
    <UserContext.Provider value={context} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App
