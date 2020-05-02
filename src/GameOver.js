import React from 'react'; 

const GameOver = (props) =>{ 
    return (
        <div className="gameOver">
            <h2 className="animated bounceIn">Game Over</h2>
            <p className="endMessage">You caught <span>{props.finalScore}</span> Pokemon!</p>  
            <div className="buttonContainer">
                <button type="button" className="redButton" onClick={props.replay}>
                    Replay<i className="fas fa-reply" aria-hidden="true"></i>
                </button>
                <button type="button" className="blueButton" onClick={props.submitUsername}>
                    Next<i className="fas fa-share" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    ) 
}

export default GameOver; 