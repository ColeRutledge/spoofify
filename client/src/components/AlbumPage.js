import React from 'react';
import { BrowserRouter, NavLink, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Artists from './Artists'
import Songs from './Songs'
import Playlists from './Playlists'
import Albums from './Albums'

const AlbumPage = () => {

    return (
        <>
            <h1>This is the album page</h1>
        </>
    )
}

export default AlbumPage;
