import React, { useEffect, useState } from "react";
import "./Register.css"
import icon_google from "../../assets/icon_google.png"

import { useAuth } from "../../context/authContext";

const Register = ({ show, closeModal, animationClass, children }) => {
    const { currentUser, userLoggedIn, loading, signInGoogle, signOut } = useAuth()
    if (!show)
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
                </div>
                {userLoggedIn ? (
                    <>
                        <span className="fadeIn">{currentUser?.displayName}</span>
                        <button className="Btn  mx-1 my-1 fadeIn"
                            style={{ width: '100%' }}
                            onClick={signOut}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={signInGoogle}
                        style={{ width: '100%' }}
                        className={`Btn  mx-1 my-1`}>
                        <img
                            src={icon_google}
                            height={30}
                            className="IconGoogle fadeIn"
                            alt="Google Icon"
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Register