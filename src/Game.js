import React, { Component } from 'react';  
import axios from 'axios'; 
import pokeball from './assets/pokeball-bw.png';

class Game extends Component {
    constructor() {
        super();
        this.state = {  
            pokemon: [],
            image: "",
            gameCounter: 0,
            gameCounterPlus1: 1,
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
            if (this.state.timer === 0) {
                // endGame will remove the Game component from the DOM 
                this.props.endGame()
            }
        }, 1000);   

        // const randomOffset = Math.floor(Math.random() * 600);
        // axios({
        //     url: `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=30`,
        //     method: 'GET',
        //     responseType: 'json'
        // }).then((res) => {
        //     this.getPokemonList(res)
        // })
    }  

    // Clears timer when Game component is removed from the DOM
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSubmit = (e) => {  
        e.preventDefault();
        // Gets the user's input
        const input = this.input.value;
        // Changes the input to lowercase, matching the format of the string from the API
        const name = input.toLowerCase();

        // Validates the user's answer
        if (name === this.state.pokemon[this.state.gameCounter]) {
            // Increments the score
            this.setState({
                gameCounter: this.state.gameCounter + 1,
            })
            this.setState(prevState => ({
                gameCounterPlus1: prevState.gameCounterPlus1 + 1
            }))
            // Clears the input field if the answer is correct
            this.input.value = '';
            this.input.className = ''; 
            // Gets the image for the next Pokemon
            this.getPokemonImage(this.state.pokemon[this.state.gameCounterPlus1])  

            this.props.setScore(this.state.gameCounter)
        } else {
            // If wrong, animates the input field to tell user their input is incorrect 
            this.input.className="error animated shake";
        }
    }

    // Get a randomized array of Pokemon that we get from the API
    getPokemonList = (res) => { 
        // Copies the API call results to a new array
        const newArray = [...res.data.results];

        // Randomizes the order of the array
        for (let i = newArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * newArray.length);
            const tempIndex = newArray[i];
            newArray[i] = newArray[randomIndex];
            newArray[randomIndex] = tempIndex;
        }  

        // Since the API call gave back an array of objects, get only the names inside of each object and save to a new array
        let newArrayNames = [] 
        newArray.forEach((object) => {
            newArrayNames.push(object.name) 
        })

        // Saves the array of Pokemon names to the component state
        this.setState({
            pokemon: newArrayNames, 
        })  

        // Makes sure that the first Pokemon image is loaded 
        this.getPokemonImage(newArrayNames[0]) 
    }     

    // Making another API call because we need to use a different endpoint to grab the images AFTER generating the array of Pokemon names. 
    // getPokemonImage = (pokeName) => {
    //     axios({
    //         url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
    //         method: 'GET',
    //         responseType: 'json'
    //     }).then((res) => {
    //         const thisImage = res.data.sprites.front_default
    //         // Saves the new image to the component state
    //         this.setState({
    //             image: thisImage
    //         })
    //     })
    // } 

    render() {
        return (
            <>
                <div className="counterBar">
                    <p className="pokedex"><img src={pokeball} alt="" className="pokeballIcon"/><span>{this.state.gameCounter}</span></p>
                    <p className="timer" aria-label="Timer"><i className="far fa-clock" aria-hidden="true"></i> 0:<span>{this.state.timer}</span></p>
                </div>
                <div className="speechBubble">
                    <p className="pokemonName">{this.state.pokemon[this.state.gameCounter]}</p>
                </div>     
                <div className="imageContainer">  
                    <img className="pokemonImage animated bounce" src={this.state.image} alt="" /> 
                </div>
                <form onSubmit={this.handleSubmit}> 
                    <label htmlFor="word">Press enter key to submit</label>
                    <input type="text" id="word" ref={(userInput) => this.input =
                        userInput} autoFocus="autoFocus" autoComplete="off" />    
                </form> 
            </>
        )
    }
}
export default Game;