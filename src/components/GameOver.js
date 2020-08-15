import React from 'react'; 
import { Button } from './styles';

const GameOver = (props) =>{ 
    return (
        <div className="gameOver wrapper">
            <h2 className="animated bounceIn">Game Over</h2>
            <h3 className="endMessage animated fadeInUp">You caught <span>{props.finalScore}</span> Pokemon!</h3>  
            <div className="buttonContainer">
                <Button isRed={true} onClick={props.replay}>
                    Replay<i className="fas fa-reply" aria-hidden="true"></i>
                </Button>
                <Button isRed={false} onClick={props.submitUsername}>
                    Next<i className="fas fa-share" aria-hidden="true"></i>
                </Button>
            </div>
        </div>
    ) 
}

export default GameOver; 