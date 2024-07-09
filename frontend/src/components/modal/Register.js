import React, { useEffect, useState } from "react";
import "./Register.css"
import icon_google from "../../assets/icon_google.png"

import { useAuth } from "../../context/authContext";

const Register = ({show, closeModal, animationClass, children}) =>{
    const {currentUser, userLoggedIn, loading, signInGoogle, signOut} = useAuth()
    
    useEffect(() => {
        console.log(`isUserLoggedIn: ${userLoggedIn}, displayName:${currentUser?.user.displayName}`)
    }, [])
    if(!show)
        return null;
    
    
    return (
        <div className={`ModalBackground ${animationClass}`} onClick={closeModal}>
            <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
                <div className="ModalHeader">
                    <h1>
                        Highscore
                    </h1>
                </div>
                <div className="ModalBody">
                    {userLoggedIn ? currentUser.user.displayName : "Guest"}
                </div>
                <div className="ModalFooter">
                    <img src={icon_google} height={50} onClick={signInGoogle}/>
                </div>
            </div>
        </div>
    )
}

export default Register