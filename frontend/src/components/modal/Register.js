import React from "react";
import "./Register.css"
import icon_google from "../../assets/icon_google.png"

const Register = ({show, closeModal, animationClass, children}) =>{
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
                    Modal Body
                </div>
                <div className="ModalFooter">
                    <img src={icon_google} height={50}/>
                </div>
            </div>
        </div>
    )
}

export default Register