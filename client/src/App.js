import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const result = await fetch(`http://host.docker.internal:5000/create-user`)

        if (result.ok) {
          const data = await result.json()
          setUser(data)
          console.log(data)
        } else {
          throw result
        }

      } catch (e) {
        console.log(e)
      }
    }
    fetchUsers()

  }, [])



  return (
    <>
      <h1>Hello React!</h1>
      <ul>
        <li>{user.id}</li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.password}</li>
      </ul>
    </>
  );
}

export default App;
