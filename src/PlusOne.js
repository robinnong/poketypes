import React, { Component } from 'react';

class PlusOne extends Component {
    // This component will unmount from the Game at the end of each animation
    render() {
        return(
            <p onAnimationEnd={this.props.unmount} className="plusOne animated fadeOutUp">+1</p>
        )
    }
}

export default PlusOne;