import React from 'react'
import ReactDOM from 'react-dom'
import FocusTrap from 'focus-trap-react'

const CreatePlaylistForm = ({onSubmit,modalRef,buttonRef,closeModal,onKeyDown,onClickOutside})=>{

    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
            tag="aside"
            role="dialog"
            tabIndex="-1"
            aria-modal="true"
            className="modal-cover"
            onClick={onClickOutside}
            onKeyDown={onKeyDown}
            >
                <div className="modal-area" ref={modalRef}>
                    <button
                    ref={buttonRef}
                    aria-label="Close Modal"
                    aria-labelledby="close-modal"
                    className="_modal-close"
                    onClick={closeModal}
                    >
                        <span id="close-modal" className="_hide-visual">Close</span>
                        <svg className="_modal-close-icon" viewBox="0 0 40 40">
                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </button>
                <div className="modal-body">
                <h3 style={{color:"white"}}>Create Playlist</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="playlist-name"style={{color:"#b3b3b3"}}>Name</label>
                            <input style={{width:"100%"}}className="form-control" id="playlist-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="playlist-description"style={{color:"#b3b3b3"}}>Description</label>
                            <textarea style={{width:"100%", height:"150px"}}className="form-control" id="playlist-description" placeholder="Give your playlist a catchy description"></textarea>
                        </div>
                        <div className="form-group">
                            <button style={{position:"relative", left:"100px"}} type="submit"> Create</button>
                        </div>
                    </form>
                </div>
                </div>
            </aside>
        </FocusTrap>, document.body
        )
    

   

} 
export default CreatePlaylistForm