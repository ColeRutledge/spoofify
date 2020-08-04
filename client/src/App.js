import React, { useState, useEffect } from 'react'
import UserContext from './context/UserContext'
import Routes from './components/Routes'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

function App() {
  const [ users, setUsers ] = useState(null)

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
  }

  return (
    <UserContext.Provider value={context} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App
