import React, { useState } from 'react';
import firebase from './firebase';

const UserSubmit = (props) => { 
    const [userName, setUserName] = useState("");
    const [characterCount, setCharacterCount] = useState(15);
    const [classN, setClassN] = useState("")

    // Adds user's score and username to Firebase 
    const addToFirebase = (e) => {
        e.preventDefault();
        // Adds the final score to the leaderboard
        const dbRef = firebase.database().ref();  
        const pushThis = { name: userName, score: props.finalScore };
        dbRef.push(pushThis);
        // Animate out component - on animation end, it will unmount itself
        animateOut();
    }

    // Saves the user's input (as username)
    const handleUserInput = (e) => {
        // Remaining characters out of 15 max
        const remainingChar = 15 - e.target.value.length;
        // Removes white spaces from start and end if left by user
        const input = (e.target.value).trim().toLowerCase();
        setUserName(input);
        setCharacterCount(remainingChar);
    } 

    // After username is uploaded to firebase, animate out the component. On animation end, the component will unmount
    const animateOut = () => setClassN("animated fadeOutRight");
     
    return (
        <form action="" className={`usernameForm ${classN}`} onSubmit={addToFirebase} onAnimationEnd={props.showHome}>
            <label htmlFor="username">Submit your username</label>
            <div className="inputContainer">
                <input type="text" id="username" name="username" maxLength="15" required autoFocus="autoFocus" value={userName} onChange={handleUserInput}/>
                <p className="characterCount">characters remaining: {characterCount}</p>
            </div>
            <button type="submit" className="blueButton">Submit score</button>
        </form>
    )
} 

export default UserSubmit;