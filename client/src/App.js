import React, { useState } from 'react'
import UserContext from './context/UserContext'

import Routes from './components/Routes'


function App() {
  const [currentTime, setCurrentTime] = useState(localStorage.getItem('currentTime') || 0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(localStorage.getItem('volume') || 0.4)
  const [auth, setAuth] = useState(localStorage.getItem('token') || '')
  const [songs, setSongs] = useState([
    {
      id: 1,
      song_url: 'https://spotify-clone-app.s3-us-west-2.amazonaws.com/acid-rain.mp3',
      title: 'Acid Rain',
      album: 'Acid Rap'
    },
    {
      id: 2,
      song_url: 'https://spotify-clone-app.s3-us-west-2.amazonaws.com/all-the-small-things.mp3',
      title: 'All The Small Things',
      album: 'Enema of the State'
    },
    {
      id: 3,
      song_url: 'https://spotify-clone-app.s3-us-west-2.amazonaws.com/cocoa-butter-kisses.mp3',
      title: 'Cocoa Butter Kisses',
      album: 'Acid Rap'
    }
  ]);
  const [pointer, setPointer] = useState(Number.parseInt(localStorage.getItem('currentSongPointer')) || 1);



  const context = {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    auth,
    setAuth,
    volume,
    setVolume,
    songs,
    setSongs,
    pointer,
    setPointer
  }

  return (
    <UserContext.Provider value={context} >
      <Routes />
    </UserContext.Provider>
  )
}

export default App
