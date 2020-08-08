import React from 'react';
import { BrowserRouter, NavLink, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Artists from './Artists'
import Songs from './Songs'
import Playlists from './Playlists'
import Albums from './Albums'

const AlbumPage = () => {
    document.body.style.backgroundColor = '#121212'

    const topBarStyle = {
        height: '75px',
        width: '100%',
        backgroundColor: 'hsl(0deg, 0%, 0%)',
        display: 'grid',
        position: 'fixed',
        marginTop: '0',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 5fr',
        justifyItems: 'center',
        alignItems: 'center',
    }

    return (
        <div style={topBarStyle}>
            <NavLink activeClassName='navbar--active2' to='/library/artists'>Artists</NavLink>
            <NavLink activeClassName='navbar--active2' to='/library/albums'>Albums</NavLink>
            <NavLink activeClassName='navbar--active2' to='/library/songs'>Songs</NavLink>
            <NavLink activeClassName='navbar--active2' to='/library/playlists'>Playlists</NavLink>
        </div>
    )
}

export default AlbumPage;
