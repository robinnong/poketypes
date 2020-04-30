import React, { Component } from 'react'; 

class GameOver extends Component {
    render() {
        return (
            <div>
                <h2 className="animated bounceIn">Game Over</h2>
                <p className="endMessage">You caught <span>{this.props.finalScore}</span> Pokemon!</p>  
                <div className="buttonContainer">
                    <button type="button" className="replayButton" onClick={this.props.replay}>Replay<i class="fas fa-reply"></i></button>
                    <button type="button" className="nextButton" onClick={this.props.submitUsername}>Next<i class="fas fa-share"></i></button>
                </div>
            </div>
        )
    }
}
export default GameOver; 