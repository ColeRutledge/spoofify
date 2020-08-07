import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import Artists from './Artists'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Library = () => {
  document.body.style.backgroundColor = '#121212'

  return (
    <div>
      <Artists />
    </div>
  )
}

export default Library
