import React, { Component } from 'react';  
import axios from 'axios'; 
import PlusOne from './PlusOne'
import pokeball from './assets/pokeball-bw.png';
import loading from './assets/loading.png';

class Game extends Component {
    constructor() {
        super();
        this.state = {  
            pokemon: [],
            image: "",
            gameCounter: 0,
            gameCounterPlus1: 1,
            timer: 60,
            visible: false, 
            loadComplete: false
        }
    }    

    // Starts the timer when Game component is added to the DOM
    componentDidMount() {
        // const randomOffset = Math.floor(Math.random() * 600);
        // axios({
        //     url: `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=30`,
        //     method: 'GET',
        //     responseType: 'json'
        // }).then((res) => {
        //     this.getPokemonList(res)
        // })
    }  

    startTimer = () => {
        // // Show a loading screen until first API comes back
        // this.interval = setInterval(() => {
        //     // Update the countdown every second
        //     this.setState({
        //         timer: this.state.timer - 1
        //     })
        //     if (this.state.timer === 0) {
        //         // endGame will remove the Game component from the DOM 
        //         this.props.endGame()
        //     }
        // }, 1000);  
    }

    // Clears timer when Game component is removed from the DOM
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Adds the animated "+1" annotation to the score
    animateScore = () => {
        // When user scores, animate PlusOne component. On animation ends, unmount the component. 
        this.setState({
            visible: !this.state.plusOne
        }) 
    }

    // When user submits answer, validate it 
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
            // Adds an animated +1 annotation to the score
            this.animateScore()
            // Clears the input field if the answer is correct
            this.input.value = '';
            this.input.className = ''; 
            // Gets the image for the next Pokemon
            this.getPokemonImage(this.state.pokemon[this.state.gameCounterPlus1])  
            // Sets the score in the parent App component
            this.props.setScore(this.state.gameCounter)
        } else {
            // If wrong, animates the input field to tell user their input is incorrect 
            this.input.className="error animated shake";
        }
    }

    getFilteredPokemonList = (array) => {
        // Filters out redundant Pokemon names by removing the suffixes ("-altered", "-m", etc.) BUT still shows the iamge variation. Example: pikachu-cosplay will be displayed as "pikachu" and it's image in cosplay form. Female and male Nidoran will both be displayed as "nidoran" but as different images
        const filteredArray = array.map((item) => {
            // Still includes these pokemon with hyphenated names (very important)
            if (item.includes("mime") || (item.includes("ho-oh")) || (item.includes("porygon")) || (item.includes("farfetch"))) {
                return item
            // Uses regex to delete characters after the dash 
            } else if (item.includes("-")) {
                const newStr = item.replace(/-[^-]*$/, '');
                // Adds the modified item to mapped array
                return newStr
            } else {
                return item
            }
        })
        return filteredArray
    }

    // Get a randomized array of Pokemon that we get from the API
    getPokemonList = (res) => { 
        // // Copies the API call results to a new array
        // const newArray = [...res.data.results];
        // // Randomizes the order of the array
        // for (let i = newArray.length - 1; i > 0; i--) {
        //     const randomIndex = Math.floor(Math.random() * newArray.length);
        //     const tempIndex = newArray[i];
        //     newArray[i] = newArray[randomIndex];
        //     newArray[randomIndex] = tempIndex;
        // }  
        // // Since the API call gave back an array of objects, get only the names inside of each object and save to a new array
        // let newArrayNames = [] 
        // newArray.forEach((object) => {
        //     newArrayNames.push(object.name) 
        // })
        // 
        // // Saves the array of Pokemon names to the component state
        // this.setState({
        //     pokemon: this.getFilteredPokemonList(newArrayNames),
        //     loadComplete: true
        // })  
        // // Makes sure that the first Pokemon image is loaded 
        // this.getPokemonImage(newArrayNames[0]) 
        // this.startTimer()
    }     

    // Making another API call because we need to use a different endpoint to grab the images AFTER generating the array of Pokemon names. 
    getPokemonImage = (pokeName) => {
        // axios({
        //     url: `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        //     method: 'GET',
        //     responseType: 'json'
        // }).then((res) => {
        //     const thisImage = res.data.sprites.front_default
        //     // Saves the new image to the component state
        //     this.setState({
        //         image: thisImage,
        //     })
        // })
    } 

    render() {
        return (
            <>
                <div className="counterBar">
                    <p className="pokedex"><img src={pokeball} alt="Pokeball icon" className="pokeballIcon"/><span>{this.state.gameCounter}</span>
                    {
                        this.state.visible
                        ? <PlusOne unmount={this.animateScore} />
                        : null
                    }</p>
                    <p className="timer" aria-label="Timer"><i className="far fa-clock" aria-hidden="true"></i> 0:<span>{this.state.timer}</span></p>
                </div>
                {this.state.loadComplete ?
                    <>
                        <div className="speechBubble">
                            <p className="pokemonName">{this.state.pokemon[this.state.gameCounter]}</p>
                        </div>     
                        <div className="imageContainer">  
                            <img className="pokemonImage animated bounce" src={this.state.image} alt={this.state.pokemon[this.state.gameCounter]} /> 
                        </div>
                        <form onSubmit={this.handleSubmit}> 
                            <label htmlFor="word">Press enter key to submit</label>
                            <input type="text" id="word" ref={(userInput) => this.input =
                                userInput} autoFocus="autoFocus" autoComplete="off" />    
                        </form> 
                    </>
                : <div className="loading">
                    <h2>Loading...</h2>
                    <img src={loading} alt=""/>
                  </div>
                }
            </>
        )
    }
}
export default Game;