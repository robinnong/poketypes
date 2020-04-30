import React, { Component } from 'react';
import firebase from './firebase';

class UserSubmit extends Component {
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
        // Remaining characters out of 15 max
        const remainingChar = 15 - e.target.value.length
        this.setState({
            userName: e.target.value,
            characterCount: remainingChar
        })
    } 
    
    render() {
        return (
            <form action="" className="usernameForm" onSubmit={this.addToFirebase}>
                <label htmlFor="username">Submit your username</label>
                <div className="inputContainer">
                    <input type="text" id="username" name="username" maxLength="15" required autoFocus="autoFocus" value={this.state.userName} onChange={this.handleUserInput}/>
                    <p className="characterCount">max characters: {this.state.characterCount}</p>
                </div>
                <button type="submit" className="endButton">Submit score</button>
            </form>
        )
    }
}

export default UserSubmit;