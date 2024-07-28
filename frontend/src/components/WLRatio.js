import {React, useEffect, useState} from "react";
import menu from "../assets/menu.png"

const Wl = ({
    ratio,
    openModal,
    wl
}) => {
    const [animationClass, setAnimationClass] = useState("")
    const [style, setStyle] = useState("0%")
    var i = 1
    
    useEffect(() =>{
        setStyle(i * 100+"%")
        console.log("style", style)
        // if (wl === 'v') {
        //     setStyle("background-position: 100%")
        // } else  {
        //     setAnimationClass('loss-animation');
        // }

        const timer = setTimeout(() => {
            setStyle(++i * 100+"%")
        }, 1000); 

        return () => clearTimeout(timer);
    },[wl])
    
    return (
        <div className={`wl-ratio-container ${animationClass}`} style={{backgroundPosition: style}}>
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