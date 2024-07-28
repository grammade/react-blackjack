import React from "react";
import menu from "../assets/menu.png"

const Wl = ({ ratio, openModal }) => {
    return (
        <div className="wl-ratio-container ">
            <h5 style={{margin: 0}}>W/L Ratio:</h5>
            <p id="wlRatio" className="dosis-regular" style={{margin:0}}>{ratio}</p>
            <div className="highscore">
                <button onClick={openModal}
                    className="Btn" style={{padding: "3px"}}>
                    <img
                        src={menu}
                        height={30}
                    />
                </button>
            </div>
        </div>
    )
}

export default Wl