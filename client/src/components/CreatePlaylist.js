import React,{useState, useContext} from 'react'
import CreatePlaylistForm from './CreatePlaylistForm'
import ReactDOM from 'react-dom'

const CreatePlaylistScreen =({handlePlaylistHide})=> {
        return ReactDOM.createPortal(
        
        
        <div className="createPlaylistScreen">
        <h1 className="createPlaylist-header" style={{fontSize:"45px",color:"white",fontWeight:"bolder",marginBottom:"16px",paddingRight:"200px"}}>Create new playlist</h1>
            <CreatePlaylistForm handlePlaylistHide={handlePlaylistHide}></CreatePlaylistForm>
        </div>
        , document.body
    )
}

export default CreatePlaylistScreen