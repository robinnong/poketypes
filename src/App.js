import React, { Component } from 'react';
import './App.css';  
import firebase from './firebase';
import Game from './Game.js'; 
import Landing from './Landing.js';
import GameOver from './GameOver.js';
import Leaderboard from './Leaderboard.js'; 

class App extends Component {  
  constructor() {
    super();
    this.state = {
      // Renders landing page on page load  
      gameState: <Landing
        startGame={() => this.startGame()}
        showLeaderboard={() => this.showLeaderboard()}
      />,
      counter: 0, 
      timer: 20,
      users: []
    } 
  } 

  // Get the highscores saved in Firebase  
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

  // When button is clicked, get the data from Firebase
  showLeaderboard = () => {
    this.setState({
      gameState: <Leaderboard 
        showHome={() => this.renderLandingPage()} 
        users={this.state.users} 
        display={this.state.leaderDisplay}
      />
    }) 
  }

  renderLandingPage = () => {
    this.setState({
      gameState: <Landing
        startGame={() => this.startGame()}
        showLeaderboard={() => this.showLeaderboard()}
      />
    }) 
  }

  componentDidMount() {
    this.getHighScores() 
  }

  endGame = () => {
    this.setState({
      gameState: <GameOver
        pokedex={this.state.counter} 
        finalScore={this.state.counter}
        showHome={() => this.renderLandingPage()}
      />,
      scores: this.state.counter
    })
  }

  addScore = () => { 
    this.setState({
      counter: this.state.counter + 1
    })
  }

  // When user clicks "Start Game" button, set tate to render Game and remove Landing page
  startGame = () => {
    this.setState({
      gameState: <Game   
        endGame={() => this.endGame()}
        scoreFunction={() => this.addScore()}   
      />,
      counter:0
    })
  }

  // Add a game mode (easy, medium, hard)
  render(){ 
    return (
      <div className="App"> 
        <main>
          <div className="wrapper">
            {this.state.gameState} 
          </div>
        </main>
        <footer>
          <p>© 2020 <a href="https://robinnong.com">Robin Nong</a>. View the code <a href="https://github.com/robinnong/poketypes">here</a>.</p>
        </footer>
      </div>
    )
  }
} 

export default App;
