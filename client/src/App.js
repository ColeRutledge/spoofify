import React, { useState, useEffect } from 'react'
import UserContext from './context/UserContext'

import Login from './components/Login'
import Users from './components/Users'
import PlayBar from './components/PlayBar'
import Routes from './components/Routes'


const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

function App() {

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [users, setUsers] = useState(null)


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/users`)

        if (res.ok) {
          const data = await res.json()
          setUsers([...data])
        }
      } catch (err) {
        console.error(err)
      }
    }

    getUsers()
  }, [])

  const context = {
    users,
    setUsers,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
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
