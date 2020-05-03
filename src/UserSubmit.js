import React, { Component } from 'react';
import firebase from './firebase';

class UserSubmit extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            characterCount: 15,
            class: ""
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
        // Animate out component - on animation end, it will unmount itself
        this.animateOut()
    }

    // Saves the user's input (as username)
    handleUserInput = (e) => {
        // Remaining characters out of 15 max
        const remainingChar = 15 - e.target.value.length
        // Removes white spaces from start and end if left by user
        const input = (e.target.value).trim().toLowerCase()
        this.setState({
            userName: input,
            characterCount: remainingChar
        })
    } 

    // After username is uploaded to firebase, animate out the component. On animation end, the component will unmount
    animateOut = () => {
        this.setState({ class: "animated fadeOutRight" })
    }
    
    render() {
        return (
            <form action="" className={`usernameForm ${this.state.class}`} onSubmit={this.addToFirebase} onAnimationEnd={this.props.showHome}>
                <label htmlFor="username">Submit your username</label>
                <div className="inputContainer">
                    <input type="text" id="username" name="username" maxLength="15" required autoFocus="autoFocus" value={this.state.userName} onChange={this.handleUserInput}/>
                    <p className="characterCount">max characters: {this.state.characterCount}</p>
                </div>
                <button type="submit" className="blueButton">Submit score</button>
            </form>
        )
    }
}

export default UserSubmit;