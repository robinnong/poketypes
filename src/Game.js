import React, { Component } from 'react'; 
import PokemonName from './PokemonName'; 
import axios from 'axios'; 

class Game extends Component {
    constructor() {
        super();
        this.state = {  
            pokemon: [],
            image: "",
            gameCounter: 0,
            gameCounterPlus1: 1,
            timer: 30
        }
    }    

    // Starts the timer when Game component is added to the DOM
    componentDidMount() {
        this.interval = setInterval(() => {
            // Update the countdown every second
            this.setState({
                timer: this.state.timer - 1
            })
            if (this.state.timer === 0) {
                // endGame will remove the Game component from the DOM 
                this.props.endGame()
            }
        }, 1000);   

        const randomOffset = Math.floor(Math.random() * 600);
        axios({
            url: `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=30`,
            method: 'GET',
            responseType: 'json'
        }).then((res) => {
            this.getPokemonList(res)
        })
    }  

    // Clears the timer when Game component is removed from the DOM, even if the user clicks the home button 
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSubmit = (e) => {  
        e.preventDefault();
        const name = this.input.value
        if (name === this.state.pokemon[this.state.gameCounter]) {
            this.props.scoreFunction()
            this.setState(prevState => ({
                gameCounter: prevState.gameCounter + 1,
                gameCounterPlus1: prevState.gameCounterPlus1 + 1
            }))
            // Clears the input field if the user's answer is correct
            this.input.value = '';
            this.input.className = ''; 
            this.getPokemonImage(this.state.pokemon[this.state.gameCounterPlus1])  
        } else {
            // set an animation on the input field to tell the user their input is incorrect 
            this.input.className="error animated shake";
        }
    }

    // Get a randomized array of Pokemon that we get from the API
    getPokemonList = (res) => { 
        const newArray = [...res.data.results];
        // const newArray = [...res]; 
        for (let i = newArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * newArray.length);
            const tempIndex = newArray[i];
            newArray[i] = newArray[randomIndex];
            newArray[randomIndex] = tempIndex;
        }  

        let newArrayNames = [] 
        newArray.forEach((object) => {
            newArrayNames.push(object.name) 
        })

        this.setState({
            pokemon: newArrayNames, 
        })  

        // Makes sure that the first Pokemon image is loaded 
        this.getPokemonImage(newArrayNames[0]) 
    }     

    // Need to use a different endpoint to grab the images AFTER generating the array of Pokemon names. Only grabbing the images we need.
    getPokemonImage = (pokeName) => {
        axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
            method: 'GET',
            responseType: 'json'
        }).then((res) => {
            const thisImage = res.data.sprites.front_default
            this.setState({
                image: thisImage
            })
            console.log(thisImage)
        })
    } 
    

    render() {
        return (
            <>
                <div className="counterBar">
                    <p className="pokedex">Pokedex: <span>{this.state.gameCounter}</span></p>
                    <p className="timer" aria-label="Timer"><i className="far fa-clock" aria-hidden="true"></i> <span>{this.state.timer}</span></p>
                </div>
                <PokemonName pokemonName={this.state.pokemon[this.state.gameCounter]} />
                <div className="imageContainer">  
                    <img className="pokemonImage" src={this.state.image} alt="" /> 
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