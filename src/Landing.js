import React from 'react';

const Landing = (props) => { 
    return (
        <div className="landing wrapper"> 
            {props.full 
            ? <button className="fullscreenToggle" onClick={props.exitFullscreen}> Disable Fullscreen Mode</button> 
            : null}
            <h1 className="animated bounceIn">PokeTypes</h1>
            <div className="landingText">
                <p>Test your typing skills and catch as many Pokemon as you can!</p>
                <p>Type the names of Pokemon as they appear on the screen.</p>
            </div>
            <div className="buttonContainer">
                <button className="blueButton" type="button" onClick={props.startGame}>Start Game</button>
                <button className="redButton" type="button" onClick={props.showLeaderboard}>Leaderboard</button>
            </div>
        </div>
    )
} 

export default Landing;