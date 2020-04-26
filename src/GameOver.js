import React, { Component } from 'react';

class GameOver extends Component {
    render() {
        return (
            <div>
                <h3>Game Over</h3>
                <p>You caught {this.props.pokedex} Pokemon!</p>
                <button onClick={this.props.playAgain}>Play Again</button>
            </div>
        )
    }
}
export default GameOver; 