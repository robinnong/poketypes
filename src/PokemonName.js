import React from 'react';

function PokemonName(props) { 
    return (
        <div className="speechBubble">
            <h2>{props.pokemonName}</h2>
        </div>         
    ) 
}

export default PokemonName;