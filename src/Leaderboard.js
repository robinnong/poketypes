import React, { Component } from 'react';
import UserData from './UserData'

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            usernames: ["user1", "user2", "user3"],
            scores: [2323, 234, 123]
        }
    }

    render() {
        return(
            <>
                <button className="backButton" onClick={this.props.showHome} type="button"><i class="fas fa-arrow-left"></i> Back to Home</button> 
                <div className="leaderboard">
                    <ol>
                        <li className="leaderboardHeading">
                            <p>Username</p>
                            <p>Score</p>
                        </li>
                        {this.state.usernames.map((username, index) => {
                            return (
                            <UserData
                            key={index}
                            name={username}
                                score={this.state.scores[index]}
                                />
                                )})
                            }
                    </ol>
                </div>
            </>
        )
    }
}

export default Leaderboard;