import React, { Component } from 'react'; 
import firebase from './firebase';

class GameOver extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            characterCount: 15
        }
    }

    // Adds user's score and username to Firebase 
    addToFirebase = (e) => {
        e.preventDefault();
        // Adds the final score to the leaderboard
        const dbRef = firebase.database().ref()   
        const userName = this.state.userName
        const userScore = this.props.finalScore
        const pushThis = { name: userName, score: userScore }
        dbRef.push(pushThis) 
        // Goes back to home page after registering high score
        this.props.showHome()
    }

    // Saves the user's input (as username)
    handleUserInput = (e) => {
        this.setState({
            userName: e.target.value,
            characterCount: e.target.value.length
        }) 
    } 

    render() {
        return (
            <div>
                <h3>Game Over</h3>
                <p>You caught {this.props.pokedex} Pokemon!</p> 
                <form action="" onSubmit={this.addToFirebase}>
                    <label htmlFor="username">Username (max. 15 characters)</label>
                    <div className="inputContainer">
                        <input type="text" id="username" name="username" maxLength="15" required value={this.state.userName} onChange={this.handleUserInput}/>
                        <p className="characterCount">{this.state.characterCount}</p>
                    </div>
                    <button type="submit" className="endButton">Submit your score</button>
                </form>
            </div>
        )
    }
}
export default GameOver; 