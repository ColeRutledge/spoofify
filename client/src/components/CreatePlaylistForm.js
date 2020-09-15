import React,{useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const CreatePlaylistForm = ({fetchPlaylists, handlePlaylistHide})=> {
    const [ setPlaylistError] = useState('')
    const {register, handleSubmit, errors} = useForm()
    const { auth } = useContext(UserContext)

    // const onCancel = (e)=>{
    //   e.preventDefault();
    //   //Toggle hide screen

    // }
    const onSubmit = async data => {

        let id = localStorage.getItem('id')
        data["id"] = id;
        try {
          const res = await fetch(`${apiUrl}/api/playlist/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token') || auth}`
                    },
            body: JSON.stringify(data),
          })

          if (res.ok) {
            let data = await res.json()
            if (data.error) {
              setPlaylistError(data.error)
              return
            }
            fetchPlaylists()
            handlePlaylistHide()

          } else throw res

        } catch (err) {
          console.log(err)
        }
      }

      return(
      <form className="create-playlist-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="createPlaylistInput">
          <label htmlFor="playlist-name"style={{color:"#b3b3b3"}}>Playlist Name</label>
          <input style={{width:"100%"}} className="playlist-name-input" id="playlist-name" name='playlistName' ref={register({required:true})} placeholder="New Playlist"/>
          {errors.playlistName && <span style={{color:"white"}}>Playlist Name is required</span>}
      </div>
      <div className="createPlaylist-buttons">
          <button className="createPlaylist-buttons-create" style={{backgroundColor:"green"}} type="submit" > Create</button>
          <button className="createPlaylist-buttons-cancel" onClick={handlePlaylistHide}>Cancel</button>
      </div>
    </form>
      )




}
export default CreatePlaylistForm
