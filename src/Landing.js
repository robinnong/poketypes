import React, { Component } from 'react';

class Landing extends Component { 
    constructor() {
        super();
        this.state = {
            class: "fadeInLeft",
            gameStart: false
        }
    }

    animateOut = () => {
        this.setState({
            class: "fadeOutRight"
        })
        setTimeout(() => {
            this.setState({ gameStart: true })
        }, 400)
    }

    render() {
        return (
            <div className={`landing wrapper animated ${this.state.class}`} onAnimationEnd={
                this.state.gameStart ? this.props.startGame : null
            }> 
                <h1>PokeTypes</h1>
                <div className="landingText">
                    <p>Test your typing skills and catch as many Pokemon as you can!</p>
                    <p>Type the names as they appear on the screen.</p>
                </div>
                <div className="buttonContainer">
                    <button className="blueButton" type="button" onClick={this.animateOut}>Start Game</button>
                    <button className="redButton" type="button" onClick={this.props.showLeaderboard}>Leaderboard</button>
                </div>
            </div>
        )
    }
} 

export default Landing;