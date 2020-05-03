// Dependencies
import React, { Component } from 'react';  
import axios from 'axios'; 
// Components
import PlusOne from './PlusOne'
import pokeball from './assets/pokeball-bw.png';
import loading from './assets/loading.png'; 

class Game extends Component {
    constructor() {
        super();
        this.state = {  
            pokemon: [],
            images: [],
            userInput: "",
            gameCounter: 0, 
            timer: 60,
            visible: false, 
            loadComplete: false,
            className: ""
        }
    }    

    // Make the first API call on page load to get ordered array of Pokemon names
    componentDidMount() { 
        const randomOffset = Math.floor(Math.random() * 900);
        axios({
            url: `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=45`,
            method: 'GET',
            responseType: 'json'
        }).then((res) => {
            this.getPokemonList(res)
        }) 
    }  

    // Starts the timer 
    startTimer = () => {
        // Show a loading screen until first API comes back
        this.interval = setInterval(() => {
            // Update the countdown every second
            this.setState({ timer: this.state.timer - 1 })
            // endGame will remove the Game component from the DOM 
            if (this.state.timer === 0) {
                this.props.endGame()
            }
        }, 1000);  
    }

    // Clears timer when Game component is removed from the DOM
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Adds the animated "+1" annotation to the score
    animateScore = () => {
        // When user scores, animate PlusOne component. On animation ends, unmount the component. 
        this.setState({ visible: !this.state.visible }) 
    }

    handleUserInput = (e) => {
        // Changes the input to lowercase
        const input = (e.target.value).trim().toLowerCase()
        // Component state is always aware of user's input
        this.setState({ userInput: input })
        console.log(this.state.userInput)
    }

    // When user presses enter key, validate answer
    handleSubmit = (e) => {  
        e.preventDefault();
        this.validateAnswer()
    }

    // When user presses space bar key, validate answer
    onKeyDown = (e) => {
        if (e.key === " ") {
            this.validateAnswer() 
        } 
    }
    
    validateAnswer = () => { 
        // Validates the user's answer
        if (this.state.userInput === this.state.pokemon[this.state.gameCounter]) {
            // Increments the score
            this.setState({ gameCounter: this.state.gameCounter + 1 }) 
            // Adds an animated +1 annotation to the score
            this.animateScore() 
            this.setState({ 
                className: "",
                userInput: ""
            })
            // Sets the score in the parent App component
            this.props.setScore(this.state.gameCounter) 
        } else {
            // If wrong, animates the input field to tell user their input is incorrect  
            this.setState({ className: "error animated shake" })
        }
    }

    getFilteredPokemonList = (array) => {
        // Filters out redundant Pokemon names by removing the suffixes ("-altered", "-m", etc.) BUT still shows the iamge variation. Example: pikachu-cosplay will be displayed as "pikachu" and it's image in cosplay form. Female and male Nidoran will both be displayed as "nidoran" but as different images
        const filteredArray = array.map((item) => {
            // Still includes these pokemon with hyphenated names (very important)
            if (item.includes("mime") || (item.includes("ho-oh")) || (item.includes("porygon")) || (item.includes("deoxys"))){
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
        newArray.forEach(object => newArrayNames.push(object.name)) 
        // Saves the array of Pokemon names to the component state
        this.setState({ pokemon: this.getFilteredPokemonList(newArrayNames) })  
        // Makes sure that the first Pokemon image is loaded 
        this.loopThis(newArrayNames) 
    }     

    // Making another API call because we need to use a different endpoint to grab the images AFTER generating the array of Pokemon names. 
    loopThis = (array) => {
        const images = []
        const promises = []
        // This is imported from the pokedex-promise-v2 node module
        const Pokedex = require('pokedex-promise-v2');
        const P = new Pokedex();

        // Making a array of Promises
        array.forEach(name => promises.push(P.resource([`/api/v2/pokemon/${name}`])))

        // Method that fulfill all Promises in the array as a single Promise - so that we get the images in the right order
        Promise.all([...promises])
        .then(([...pokemon]) => {  
            const pokemonArr = pokemon.map(item => item[0])
            // Saving all the images in correct order
            pokemonArr.forEach(pokemon => images.push(pokemon.sprites.front_default)) 
        })
        
        // Saving the array of images of the component state
        this.setState({ images: images })  
        // Start the game after 1 second to allow images to load
        setTimeout(() => {
            this.setState({ loadComplete: true })
            this.startTimer()
        }, 1000)
    } 

    render() {
        return (
            <div className="wrapper game">
                <div className="counterBar">
                    <div className="pokedex">
                        <img src={pokeball} alt="Pokeball icon" className="pokeballIcon"/>
                        <span>{this.state.gameCounter}</span>
                        {
                            this.state.visible
                            ? <PlusOne unmount={this.animateScore} />
                            : null
                        }
                    </div>
                    <div className="timer" aria-label="Timer">
                        <i className="far fa-clock" aria-hidden="true"></i> 0:<span>{this.state.timer}</span>
                    </div>
                </div>
                
                {this.state.loadComplete ?
                    <div className="pokemonContainer">
                        <div className="speechBubble">
                            <p className="pokemonName">{this.state.pokemon[this.state.gameCounter]}</p>
                        </div>     
                        <div className="imageContainer">  
                            <img className="pokemonImage" src={this.state.images[this.state.gameCounter]} alt={this.state.pokemon[this.state.gameCounter]} /> 
                        </div>
                        <form onSubmit={this.handleSubmit} onKeyDown={this.onKeyDown}> 
                            <label htmlFor="word">Press enter or spacebar to submit</label>
                            <input className={this.state.className} type="text" id="word" autoFocus="autoFocus" autoComplete="off" value={this.state.userInput} onChange={this.handleUserInput} />    
                        </form> 
                    </div>
                : <div className="loading">
                    <h2>Loading...</h2>
                    <img src={loading} alt=""/>
                  </div>
                }
            </div>
        )
    }
}
export default Game;