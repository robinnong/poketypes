import React from 'react';

// This function component will unmount from the Game at the end of each animation
const PlusOne = (props) => {
    return(
        <span onAnimationEnd={props.unmount} className="plusOne animated fadeOutUp">+1</span>
    ) 
}

export default PlusOne;