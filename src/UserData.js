import React, { Component } from 'react'

class UserData extends Component {
    render() {
        return (
            <li>
                <p className="userName">{this.props.name}</p>
                <p className="score">{this.props.score}</p>
            </li>
        )
    }
}

export default UserData;