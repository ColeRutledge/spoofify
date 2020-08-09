import React from 'react'
import { Switch, NavLink, Redirect } from 'react-router-dom'
import Artists from './Artists'
import Albums from './Albums'
import Songs from './Songs'
import Playlists from './Playlists'
import ProtectedRoute from './ProtectedRoute'
import ArtistDetails from './ArtistDetails'
import AlbumPage from './AlbumPage'


const Library = () => {
  document.body.style.backgroundColor = '#121212'


  const topBarStyle = {
    height: '75px',
    width: '100%',
    backgroundColor: 'hsl(0deg, 0%, 0%)',
    display: 'grid',
    position: 'fixed',
    marginTop: '0',
    marginBottom: '50px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 5fr',
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
      </div>
      <Switch>
        <ProtectedRoute exact path='/library/artists' component={Artists} />
        <ProtectedRoute exact path='/library/albums' component={Albums} />
        <ProtectedRoute path='/library/songs' component={Songs} />
        <ProtectedRoute path='/library/playlists' component={Playlists} />
        <ProtectedRoute path='/library/artists/:id' component={ArtistDetails} />
        <ProtectedRoute path='/library/albums/:id' component={AlbumPage} />
        <Redirect to='/library/artists' />
      </Switch>
    </>
  )
}

export default Library
