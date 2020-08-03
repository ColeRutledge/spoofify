import React from 'react';
// import React, { useState, useEffect } from 'react';
import Login from './components/Login'

function App() {
  // const [user, setUser] = useState({})

  // useEffect(() => {}, [])


  return (
    <>
      <h1 style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Hello from the React App!</h1>
      {/* <ul>
        <li>{user.id}</li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.password}</li>
      </ul> */}
      <Login />
    </>
  );
}

export default App;
