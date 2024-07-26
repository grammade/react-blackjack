import React, { useEffect, useState } from "react";
import "./Register.css"
import icon_google from "../../assets/icon_google.png"
import { getHighscore } from "../../services/HighscoreAPI";

import { useAuth } from "../../context/authContext";

const Register = ({ show, closeModal, animationClass, children }) => {
    const { currentUser, userLoggedIn, loading, signInGoogle, signOut } = useAuth()
    const [highScore, setHighScore] = useState([])

    useEffect(() => {
        async function fetch() {
            const res = await getHighscore()
            console.log("highscore", res)
            setHighScore(res)
        }

        fetch()
    }, [])

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
                    <div className="TopBody">
                        {
                            highScore.map((h, index) => (
                                <div key={index} className="HighScoreUser">
                                    <div>{h.username}</div>
                                    <div>{h.w} / {h.l}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="BottomBody fadeIn">
                        <div className="CurrentUser">
                            {/* add current user */}
                        </div>
                    </div>
                </div>
                {userLoggedIn ? (
                    <>
                        <button className="Btn fadeIn"
                            style={{ width: '100%' }}
                            onClick={signOut}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={signInGoogle}
                        style={{ width: '100%' }}
                        className={`Btn my-1 mx-1`}>
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