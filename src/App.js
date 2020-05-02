import React, { Component } from 'react';
import firebase from './firebase';
import './styles.css';  
import Game from './Game.js'; 
import Landing from './Landing.js';
import GameOver from './GameOver.js';
import Leaderboard from './Leaderboard.js'; 
import UserSubmit from './UserSubmit'; 

class App extends Component {  
  constructor() {
    super();
    this.state = {
      // Initial state - Renders the landing page on page load  
      gameState: <Landing
        startGame={this.startGame}
        showLeaderboard={this.renderLeaderboard}
      />,
      counter: 0,  
      users: []
    } 
  } 

  // Calls function to get data from firebase whenever App loads so it's already available when Leaderboard is mounted (no waiting)
  componentDidMount() {
    this.getHighScores()
  }

  // Gets the highscores saved in Firebase 
  getHighScores = () => {
    // Sets up listener to firebase database
    const dbRef = firebase.database().ref();
    dbRef.on('value', (result) => {
      // Gets all data from Firebase
      const data = result.val();
      const userObjects = [];
      // Extracts only the objects containing name and score
      for (let key in data) {
        userObjects.push(data[key])
      }
      // Sorts the array of users by their score
      userObjects.sort((a, b) => b.score - a.score);
      // Saves only the top 10 high scores and usernames
      const topScores = userObjects.slice(0, 10)
      this.setState({
        users: topScores
      })
    })
  }

  // Renders the Leaderboard component 
  renderLeaderboard = () => { 
    this.setState({
      gameState: <Leaderboard 
        showHome={this.renderLandingPage} 
        users={this.state.users} 
        display={this.state.leaderDisplay}
      />
    }) 
  }

  // Renders the Landing page component
  renderLandingPage = () => {
    this.setState({
      gameState: <Landing
        startGame={this.startGame}
        showLeaderboard={this.renderLeaderboard}
      />
    }) 
  }

  // Renders the Username Form component
  renderUsernameForm = () => {
    this.setState({
      gameState: <UserSubmit 
        finalScore={this.state.counter}
        showHome={this.renderLandingPage}
      />
    }) 
  }

  // When user clicks "Start Game", render Game and remove Landing page from DOM
  startGame = () => {
    this.setState({
      gameState: <Game
        endGame={this.endGame}
        setScore={this.setScore}
      />,
      counter: 0 
    })
  } 
  
  // Renders the Game Over component 
  endGame = () => {
    this.setState({
      gameState: <GameOver
        finalScore={this.state.counter}
        replay={this.startGame}
        submitUsername={this.renderUsernameForm}
      />
    })
  }

  // Increments the score passed as argument from the Game component
  setScore = (score) => { 
    this.setState({
      counter: score
    })
  }

  render(){ 
    return (
      <div className="App">  
        <main>
          <div className="wrapper">
            {this.state.gameState} 
          </div>
        </main> 
      </div>
    )
  }
} 

export default App;
