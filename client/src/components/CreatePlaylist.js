import React from 'react'
import CreatePlaylistForm from './CreatePlaylistForm'
import ReactDOM from 'react-dom'

const CreatePlaylistScreen =({handlePlaylistHide, fetchPlaylists})=> {
        return ReactDOM.createPortal(


        <div className="createPlaylistScreen">
        <h1 className="createPlaylist-header">Create new playlist</h1>
            <CreatePlaylistForm fetchPlaylists={fetchPlaylists} handlePlaylistHide={handlePlaylistHide}></CreatePlaylistForm>
        </div>
        , document.body
    )
}

export default CreatePlaylistScreen
