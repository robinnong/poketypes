import React, { Component } from 'react'; 
import PokemonName from './PokemonName'
import { Animated } from "react-animated-css";
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = { 
            // Array of Pokemon
            pokemon: this.returnRandomArray(),
            gameCounter: 0,
            timer: 10
        }
    }    

    // Starts the timer when Game component is added to the DOM
    componentDidMount() {
        this.interval = setInterval(() => {
            // Update the countdown every second
            this.setState({
                timer: this.state.timer - 1
            })
        }, 1000);
        // End the game when time is out
        setTimeout(() => { 
            // endGame will remove the Game component from the DOM 
            this.props.endGame()
        }, 10000)
    }  

    // Clears the timer when Game component is removed from the DOM
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSubmit = (e) => {  
        e.preventDefault();
        const name = this.input.value
        if (name === this.state.pokemon[this.state.gameCounter]) {
            this.props.scoreFunction()
            this.setState(prevState => ({
                gameCounter: prevState.gameCounter + 1
            }))
            // Clears the input field if the user's answer is correct
            this.input.value = '';
            this.input.className = '';
        } else {
            // set an animation on the input field to tell the user their input is incorrect
            // clear the input?? 
            this.input.className="error animated shake";
        }
    }

    // Get a randomized array of Pokemon that we get from the API
    returnRandomArray = () => {
        const newArray = ["lucario", "pikachu", "ditto", "mewtwo", "jigglypuff"] 
        for (let i = newArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        const tempIndex = newArray[i];
        newArray[i] = newArray[randomIndex];
        newArray[randomIndex] = tempIndex;
        } 
        return newArray; 
    } 

    // getPokemonList = (res) => { 
    //     const pokeCache = res.data.results; 
    //     const randomNum = Math.floor(Math.random() * 10); 
    //     const randomPokemon = pokeCache[randomNum].name;
    //     return randomPokemon;
    // }

    // componentDidMount() {
    //     axios({
    //         url: `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20`,
    //         method: 'GET',
    //         responseType: 'json'
    //     }).then((res) => {
    //         this.setState({
    //             pokemon: this.getPokemonList(res)
    //         })
    //     })
    // }  
 
    render() {
        return (
            <>
                <div className="counterBar">
                    <p className="pokedex">Pokedex: <span>{this.state.gameCounter}</span></p>
                    <p className="timer" aria-label="Timer"><i className="far fa-clock" aria-hidden="true"></i> <span>{this.state.timer}</span></p>
                </div>
                <PokemonName
                    pokemonName={this.state.pokemon[this.state.gameCounter]}
                />
                <div className="imageContainer"> 
                    <img className="pokemonImage" src={require("./assets/vaporeon.png")} alt=""/>  
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="word">Type the pokemon name to catch!</label>
                    <input type="text" id="word" ref={(userInput) => this.input =
                        userInput} autoFocus="autoFocus" autoComplete="off" />    
                </form> 
                <p>Click the enter key to submit</p>
            </>
        )
    }
}
export default Game;