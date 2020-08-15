import React from 'react';
import { Button } from './styles';

const Landing = (props) => {   
    return (
        <div className="landing wrapper animated fadeInLeft" > 
            <h1>PokeTypes</h1>
            <div className="landingText">
                <p>Test your typing skills and catch as many Pokemon as you can!</p>
                <p>Type the names as they appear on the screen.</p>
            </div>
            <div className="buttonContainer">
                <Button isRed={false} onClick={props.startGame}>Start Game</Button>
                <Button isRed={true} onClick={props.showLeaderboard}>Leaderboard</Button>
            </div>
        </div>
    ) 
} 

export default Landing;