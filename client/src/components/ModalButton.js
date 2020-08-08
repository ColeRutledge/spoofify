import React from 'react'


const ModalButton = ({buttonRef,showModal, text}) =>{
    return(
        <div
        className="btn btn-lg btn-danger center modal-button"
        ref={buttonRef}
        onClick={showModal}
        style={{color: "#565252", margin:"20px", fontSize:"16px", paddingBottom:"4px"}}>{text}
        </div>
    )
}
export default ModalButton