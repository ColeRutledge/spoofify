import React from 'react'
// import ReactDOM from 'react-dom';
import ModalButton from './ModalButton'
import CreatePlaylistForm from './CreatePlaylistForm'



class Modal extends React.Component{
    state = { isShown: false};

    showModal = () => {
        this.setState({ isShown: true} , () =>{
            this.closeButton.focus();

        })
        this.toggleScrollLock();
    }

    toggleScrollLock = () =>{
        document.querySelector('html').classList.toggle('scroll-lock')
    }

    closeModal = () =>{
        this.setState({isShown:false});
        this.ModalButton.focus();
        this.toggleScrollLock();
    }

    onKeyDown = (event) => {
        if (event.keyCode === 27){
            // 27 is escape key
            this.closeModal();
        }
    }

    onClickOutside =(event) =>{
        if(this.modal && this.modal.contains(event.target)) return;
        this.closeModal();
    }

    onSubmit = (event)=>{

        event.preventDefault(event);
    }

render() {
    return(
        <>
        <ModalButton
        showModal= {this.showModal}
        buttonRef = {(n)=>  (this.ModalButton = n)}
        text={this.props.text}
        />
        {this.state.isShown ? (
            <CreatePlaylistForm
                onSubmit={this.onSubmit}
                modalRef={ (n) => (this.modal = n)}
                buttonRef={(n) => (this.closeButton = n)}
                closeModal ={this.closeModal}
                onKeyDown={this.onKeyDown}
                onClickOutside= {this.onClickOutside}
        />
        ) : null}
        </>
    )
    }
}

export default Modal
