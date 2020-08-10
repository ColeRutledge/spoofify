import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'


const ModalButton = ({buttonRef,showModal}) =>{
    return(
        <Button ref={buttonRef} onClick={showModal} ><FavoriteIcon style={{ color: 'hsla(0,0%,100%,.3)', pointerEvents: 'none' }} /></Button>
    )
}
export default ModalButton

// {/* <div
//         className="btn btn-lg btn-danger center modal-button"
        
        
//         style={{color: "#565252", margin:"20px", fontSize:"16px", paddingBottom:"4px"}}>{text}
//         </div> */}