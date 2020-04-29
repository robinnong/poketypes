import React, { Component } from 'react'; 
import firebase from './firebase';

class GameOver extends Component {
    constructor() {
        super();
        this.state = {
            userName: ""
        }
    }

    addToFirebase = (e) => {
        e.preventDefault();
        // adds the final score to the leaderboard
        const dbRef = firebase.database().ref()   
        const userName = this.state.userName
        const userScore = this.props.finalScore
        const pushThis = 
            { name: userName, score: userScore }
        dbRef.push(pushThis) 
        // Go back to home page after registering high score
        this.props.showHome()
    }

    handleUserInput = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Game Over</h3>
                <p>You caught {this.props.pokedex} Pokemon!</p> 
                {/*             // make sure user has a limit on their username! 
 */}
                <form action="" onSubmit={this.addToFirebase}>
                    <label htmlFor="username">Username (max. 15 characters)</label>
                    <input type="text" id="username" name="username" maxLength="15" required value={this.state.userName} onChange={this.handleUserInput}/>
                    <button type="submit" className="endButton">Submit your score</button>
                </form>
            </div>
        )
    }
}
export default GameOver; 