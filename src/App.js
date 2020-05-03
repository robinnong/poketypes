// Dependencies
import React, { Component } from 'react';
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
      users: [],
      isFull: false,
      footerOn: true,
      showButton: false
    } 
  } 

  // Calls function to get data from firebase whenever App loads so it's already available when Leaderboard is mounted (no waiting)
  componentDidMount() {  
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
      this.setState({ users: topScores })
    })

    // Shows fullscreen mode button if user is on mobile
    const mqlMobile = window.matchMedia('(max-width: 480px)');
    if (mqlMobile.matches) {
      this.setState({ showButton: true });
    }
  }

  fullscreen = () => {
    this.setState({ 
      isFull: true,
      showButton: false  
     }) 
  }

  // Renders the Leaderboard component 
  renderLeaderboard = () => { 
    this.setState({
      gameState: <Leaderboard 
        showHome={this.renderLandingPage} 
        users={this.state.users} 
        display={this.state.leaderDisplay}
      />,
      footerOn: false
    }) 
  }

  // Renders the Landing page component
  renderLandingPage = () => {
    this.setState({
      gameState: <Landing
        startGame={this.startGame}
        showLeaderboard={this.renderLeaderboard}
      />,
      footerOn: true
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
      counter: 0,
      footerOn: false
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
  setScore = (score) => { this.setState({ counter: score }) } 

  render(){ 
    return (
      <div className="App">
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        > 
          <main>  
            {this.state.showButton ? <button className="fullscreenButton" onClick={this.fullscreen}>Enable Fullscreen Mode</button> : null}
            {this.state.gameState} 
          </main> 
          {this.state.footerOn 
          ? <footer>
              <p>Code and design by <a href="https://github.com/robinnong">Robin Nong</a>. Pokémon and Pokémon character names are trademarks of Nintendo. Trademarks are property of respective owners.</p>
          </footer>
          : null} 
        </Fullscreen>
      </div>
    )
  }
} 

export default App;
