import { React, useEffect, useState } from "react";
import menu from "../assets/menu.png"

const Wl = ({
    ratio,
    openModal,
    wl
}) => {
    const [style, setStyle] = useState("50%")
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        console.log("wl animation", wl)
        if (wl.res === "v"){
            setStyle("100%")
        }else{
            setStyle("0%")
        }
        
            
        const timer = setTimeout(() => {
            setStyle("50%")
        }, 700)
        return () => clearTimeout(timer)
    }, [wl])

    return (
        <div className={`wl-ratio-container`} style={{ backgroundPosition: style }}>
            <h5 style={{ margin: 0 }}>W/L Ratio:</h5>
            <p id="wlRatio" className="dosis-regular" style={{ margin: 0 }}>{ratio}</p>
            <div className="highscore">
                <button onClick={openModal}
                    className="Btn" style={{ padding: "3px" }}>
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