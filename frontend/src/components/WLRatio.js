import React from "react";

const Wl = ({ ratio }) => {
    return (
        <div className="wl-ratio-container text-center ">
            <h5 style={{margin: 0}}>W/L Ratio:</h5>
            <p id="wlRatio" className="dosis-regular" style={{margin:0}}>{ratio}</p>
        </div>
    )
}

export default Wl