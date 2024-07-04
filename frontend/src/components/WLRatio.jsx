import React from "react";

const Wl = ({ ratio }) => {
    return (
        <div className="wl-ratio-container text-center">
            <h5>W/L Ratio:</h5>
            <p id="wlRatio">{ratio}</p>
        </div>
    )
}

export default Wl