import React from 'react';

function Landing(props) { 
    return (
        <> 
            <h1 className="animated bounceIn">PokeTypes</h1>
            <div className="landingText">
                <p>Test your typing skills and catch as many Pokemon as you can!</p>
                <p>Type the names of Pokemon as they appear on the screen.</p>
            </div>
            <button className="startButton" type="button" onClick={props.startGame}>Start Game</button>
            <button className="leaderboardButton" type="button" onClick={props.showLeaderboard}>Leaderboard</button>
        </>
    )
} 

export default Landing;