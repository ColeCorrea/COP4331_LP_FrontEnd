import React from 'react'

const modalStyle = {
    zIndex: 2,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

const overlay = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1
}

export default function Modal({open, children}){
    if(!open) return null

    return(
        <>
            <div style={overlay}/>
            <div style={modalStyle}>
                {children}
            </div>
        </>
    )
}
