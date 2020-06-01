// Dependencies
import React, { useState, useEffect } from 'react';
import Fullscreen from "react-full-screen";
import firebase from './firebase';
// Styles
import './styles.css';  
// Components
import Game from './Game.js'; 
import Landing from './Landing.js';
import GameOver from './GameOver.js';
import Leaderboard from './Leaderboard.js'; 
import UserSubmit from './UserSubmit'; 

const App = () => {    
  const [gameState, setGameState] = useState(
    <Landing
    startGame={()=>startGame()}
    showLeaderboard={()=>renderLeaderboard()}
    />
    ); 
  const [footerOn, showFooter] = useState(true); 
  const [counter, setCounter] = useState(0);
  const [isFull, setFull] = useState(false);
  const [button, showButton] = useState(false); 
  let userScores = [];

  useEffect(() => {  
    let userObjects = [];  
    // Sets up listener to firebase database
    const dbRef = firebase.database().ref();
    // Calls function to get data from firebase whenever App loads so it's already available when Leaderboard is mounted 
    dbRef.on('value', (result) => {
      // Gets all data from Firebase
      const data = result.val();
      // Extracts only the objects containing name and score
      for (let key in data) {
        userObjects.push(data[key])
      }
      // Sorts the array of users by score and saves only the top 40 usernames 
      userScores = userObjects.sort((a, b) => b.score - a.score).slice(0, 40);
    })  
    // Shows fullscreen mode button if user is on mobile
    const mqlMobile = window.matchMedia('(max-width: 480px)');
    if (mqlMobile.matches) {
      showButton(true);
    } 
  }, [])

  const fullscreen = function() { 
    setFull(true);
    showButton(false);
  }

  // Renders the Leaderboard component 
  const renderLeaderboard = function() { 
    setGameState( 
      <Leaderboard 
        showHome={renderLandingPage} 
        users={userScores}  
      /> ); 
    showFooter(false);
  }

  // Renders the Landing page component
  const renderLandingPage = function() { 
    setGameState( 
      <Landing
        startGame={startGame}
        showLeaderboard={renderLeaderboard}
      /> );
    showFooter(true);
  }

  // Renders the Username Form component
  const renderUsernameForm = function() { 
    setGameState(
      <UserSubmit 
        finalScore={counter}
        showHome={renderLandingPage}
      />);
  }

  // When user clicks "Start Game", render Game and remove Landing page from DOM
  const startGame = function() { 
    setGameState(
      <Game
        endGame={endGame}
        setScore={setScore}
      />);
    setCounter(0);
    showFooter(true);
  } 
  
  // Renders the Game Over component 
  const endGame = function() { 
    setGameState(
      <GameOver
        finalScore={counter}
        replay={startGame}
        submitUsername={renderUsernameForm}
      />);
  }

  // Increments the score passed as argument from the Game component
  const setScore = (score) => setCounter(score); 
 
  return (
    <div className="App">
      <Fullscreen enabled={isFull} onChange={isFull => setFull(isFull)} > 
        <main>  
          {button ? <button className="fullscreenButton" onClick={fullscreen}>Enable Fullscreen Mode</button> : null}
          {gameState} 
        </main> 
        {footerOn 
        ? <footer>
            <p>Code and design by <a href="https://github.com/robinnong" target="_blank" rel="noopener noreferrer">Robin Nong</a>. Pokémon and Pokémon character names are trademarks of Nintendo. Trademarks are property of respective owners.</p>
        </footer>
        : null} 
      </Fullscreen>
    </div>
  ) 
} 

export default App;
