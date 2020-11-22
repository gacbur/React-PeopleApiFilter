import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
    borderRadius: 12,
    padding: '1.5em',
    width: 400,
    height: 450,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const Modal = ({ modalOff, currentInspectedUser }) => {
    return ReactDom.createPortal(
        <>
            <div className="modal-control">
                <div style={OVERLAY_STYLES}>
                    <button onClick={modalOff} className="overlay-btn">✖</button>
                </div >
                <div style={MODAL_STYLES}>
                    <h3>Personal Informations:</h3>
                    <br />
                    <p>Title: <strong>{currentInspectedUser.name.title}</strong></p>
                    <p>Name: <strong>{currentInspectedUser.name.first}</strong></p>
                    <p>Surname: <strong>{currentInspectedUser.name.last}</strong></p>
                    <br /><br />
                    <h3>Address:</h3>
                    <br />
                    <p>Country: <strong>{currentInspectedUser.location.country}</strong></p>
                    <p>City: <strong>{currentInspectedUser.location.city}</strong></p>
                    <p>Street: <strong>{currentInspectedUser.location.street.name}/{currentInspectedUser.location.street.number}</strong></p>
                    <p>Postal Code: <strong>{currentInspectedUser.location.postcode}</strong></p>
                    <br /><br />
                    <h3>Contact:</h3>
                    <br />
                    <p>Email: <strong>{currentInspectedUser.email}</strong></p>
                    <p>Phone: <strong>{currentInspectedUser.phone}</strong></p>
                </div >
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default Modal;