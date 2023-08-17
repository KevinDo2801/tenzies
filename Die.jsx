import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const getDotsForValue = (value) => {
        let dots = [];

        if (value === 1 || value === 3 || value === 5) {
            dots.push(<div className="dot center" key="center"></div>);
        }
        if (value > 1) {
            dots.push(<div className="dot top-left" key="topLeft"></div>);
            dots.push(<div className="dot bottom-right" key="bottomRight"></div>);
        }
        if (value > 3) {
            dots.push(<div className="dot top-right" key="topRight"></div>);
            dots.push(<div className="dot bottom-left" key="bottomLeft"></div>);
        }
        if (value === 6) {
            dots.push(<div className="dot mid-left" key="midLeft"></div>);
            dots.push(<div className="dot mid-right" key="midRight"></div>);
        }
        return dots;
    };

    return (
        <div 
            className="dice-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {getDotsForValue(props.value)}
        </div>
    )
}