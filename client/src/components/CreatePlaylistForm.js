import React,{useState, useContext} from 'react'
import ReactDOM from 'react-dom'
import FocusTrap from 'focus-trap-react'
import {useForm} from 'react-hook-form'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const CreatePlaylistForm = ({onClickOutside,onKeyDown,modalRef,buttonRef,closeModal,handlePlaylistHide})=> {
    const [ playlistError, setPlaylistError] = useState('')
    const {register, handleSubmit, errors} = useForm()
    const { auth } = useContext(UserContext)

    const onCancel = (e)=>{
      e.preventDefault();
      //Toggle hide screen 

    }
    const onSubmit = async data => {
        
        let id = localStorage.getItem('id')
        data["id"] = id;
        console.log(data)
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

            console.log(data)
            handlePlaylistHide()
          } else throw res

        } catch (err) {
          console.log(err)
        }
      }

    // const onSubmit = data =>{
    //     let id = localStorage.getItem('id')
    //     data["id"]= id
    //     console.log(data)
    // }


    // return ReactDOM.createPortal(
    //     <FocusTrap>
    //         <aside
    //         tag="aside"
    //         role="dialog"
    //         tabIndex="-1"
    //         aria-modal="true"
    //         className="modal-cover"
    //         onClick={onClickOutside}
    //         onKeyDown={onKeyDown}
    //         >
    //             <div className="modal-area" ref={modalRef}>
    //                 <button
    //                 ref={buttonRef}
    //                 aria-label="Close Modal"
    //                 aria-labelledby="close-modal"
    //                 className="_modal-close"
    //                 onClick={closeModal}
    //                 >
    //                     <span id="close-modal" className="_hide-visual">Close</span>
    //                     <svg className="_modal-close-icon" viewBox="0 0 40 40">
    //                     <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    //                     </svg>
    //                 </button>
    //             <div className="modal-body">
    //             <h3 style={{color:"white"}}>Create Playlist</h3>
    //                 <form onSubmit={handleSubmit(onSubmit)}>
    //                     <div className="form-group">
    //                         <label htmlFor="playlist-name"style={{color:"#b3b3b3"}}>Name</label>
    //                         <input style={{width:"100%"}}className="form-control" id="playlist-name" name='playlistName' ref={register({required:true})}/>
    //                         {errors.playlistName && <span style={{color:"white"}}>Playlist Name is required</span>}
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="playlist-description"style={{color:"#b3b3b3"}}>Description</label>
    //                         <textarea style={{width:"100%", height:"150px"}}className="form-control" id="playlist-description" name='playlistDescription' placeholder="Give your playlist a catchy description" ref={register}></textarea>
    //                     </div>
    //                     <div className="form-group">
    //                         <button style={{position:"relative", left:"90px", borderRadius:"7px",fontSize:"17px",backgroundColor:"green",color:"white",outline:"none",border:"none"}} type="submit"> Create</button>
    //                     </div>
    //                 </form>
    //             </div>
    //             </div>
    //         </aside>
    //     </FocusTrap>, document.body
    //     )
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
