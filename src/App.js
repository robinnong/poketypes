import React, { Component } from 'react';
import './App.css'; 
import Footer from './Footer.js';
import Game from './Game.js'; 
import Landing from './Landing.js';
import GameOver from './GameOver.js'

class App extends Component {  
  constructor() {
    super();
    this.state = {
      // On page load, render the Landing Page
      gameState: this.renderGame(),
      counter: "", 
      // set 1 minute timer
      timer: ""
    } 
  }

  setTimer = () => {  
      const interval = setInterval(() => {
        // Update the countdown every second
        this.setState({
          timer: this.state.timer - 1
        })
      }, 1000); 
      // Stop the countdown after 60 seconds
      setTimeout(() => {
        clearInterval(interval) 
        // Show the game over message with Game Over animation
        this.setState({
          gameState: <GameOver 
          pokedex={this.state.counter}
          playAgain={() => this.startGame()}
          />
        })
      }, 10000)
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
      startTimer={() => this.setTimer()}
      scoreFunction = {() => this.addScore()}
      time = {this.state.timer}
      />,
      timer: 10,
      counter: 0
    })
  }

  // Render landing page on page load (this is a method on the page state)
  renderGame() { 
    return (
      <Landing 
        onClick={() => this.startGame()}
      />
    );
  }

  // Add a game mode (easy, medium, hard)
  render(){ 
    return (
      <div className="App"> 
        <main>
          <div className="wrapper">
            <div className="counterBar">
              <p className="pokedex">Pokedex: <span>{this.state.counter}</span></p>
              <p className="timer">Timer: <span>{this.state.timer}</span></p>
            </div>
            {this.state.gameState} 
          </div>
        </main>
        <footer>
          <p>© 2020 <a href="https://www.robinnong.com">Robin Nong</a>. View the code <a href="https://github.com/robinnong/poketypes">here</a>.</p>
        </footer>
      </div>
    )
  }
} 

export default App;
