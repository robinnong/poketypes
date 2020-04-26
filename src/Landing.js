import React from 'react';

function Landing(props) { 
    return (
        <> 
            <h1>PokeTypes</h1>
            <p>Test your typing skills and catch as many Pokemon as you can!</p>
            <p>Type the names of Pokemon as they appear on the screen.</p>
            <button type="button" onClick={props.startGame}>Start Game</button>
            <button type="button" onClick={props.showLeaderboard}>Leaderboard</button>
        </>
    )
} 

export default Landing;