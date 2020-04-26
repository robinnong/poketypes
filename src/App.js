import React, { Component } from 'react';
import './App.css';  
import Game from './Game.js'; 
import Landing from './Landing.js';
import GameOver from './GameOver.js'
import Leaderboard from './Leaderboard.js'

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
      // set 1 minute timer
      timer: 10
    } 
  } 

  showLeaderboard = () => {
    //code to show a modal with the high scores
    this.setState({
      gameState: <Leaderboard 
        showHome={() => this.renderLandingPage()}
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

  endGame = () => {
    this.setState({
      gameState: <GameOver
        pokedex={this.state.counter}
        playAgain={() => this.startGame()}
      />
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
