import React, { useContext } from 'react'
import { Switch, NavLink, Redirect } from 'react-router-dom'
import Artists from './Artists'
import Albums from './Albums'
import Songs from './Songs'
import Playlists from './Playlists'
import PlaylistDetails from './PlaylistDetails'
import ProtectedRoute from './ProtectedRoute'
import ArtistDetails from './ArtistDetails'
import AlbumPage from './AlbumPage'

import UserContext from '../context/UserContext'


const Library = () => {
  const { auth, setAuth } = useContext(UserContext)
  document.body.style.backgroundColor = '#121212'

  const logout = () => {
    if (auth) {
      setAuth('')
      localStorage.removeItem('token')
      localStorage.removeItem('volume')
      localStorage.removeItem('currentTime')
      localStorage.removeItem('currentPointer')
    }
  }

  const linkStyles = {
    margin: '0 50px',
    textDecoration: 'none',
    fontSize: '16px',
  }


  const topBarStyle = {
    height: '75px',
    width: '100%',
    backgroundColor: 'hsl(0deg, 0%, 0%)',
    display: 'grid',
    position: 'fixed',
    marginTop: '0',
    marginBottom: '50px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 5fr 250px',
    justifyItems: 'center',
    alignItems: 'center',
    zIndex: '1',
  }

  return (
    <>
      <div style={topBarStyle}>
        <NavLink activeClassName='navbar--active2' to='/library/artists'>Artists</NavLink>
        <NavLink activeClassName='navbar--active2' to='/library/albums'>Albums</NavLink>
        <NavLink activeClassName='navbar--active2' to='/library/songs'>Songs</NavLink>
        <NavLink activeClassName='navbar--active2' to='/library/playlists'>Playlists</NavLink>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', justifySelf: 'end' }}>
          <h1 style={{ ...linkStyles, color: '#bfbfbf' }}>Welcome, <span>{localStorage.getItem('username')}</span></h1>
          <NavLink style={{ ...linkStyles }} onClick={logout} to='/logout'>Logout</NavLink>
        </div>
        <div />
      </div>
      <Switch>
        <ProtectedRoute exact path='/library/artists' component={Artists} />
        <ProtectedRoute exact path='/library/albums' component={Albums} />
        <ProtectedRoute path='/library/songs' component={Songs} />
        <ProtectedRoute exact path='/library/playlists' component={Playlists} />
        <ProtectedRoute path='/library/artists/:id' component={ArtistDetails} />
        <ProtectedRoute path='/library/albums/:id' component={AlbumPage} />
        <ProtectedRoute path='/library/playlists/:id' component={PlaylistDetails} />
        <Redirect to='/library/artists' />
      </Switch>
    </>
  )
}

export default Library
