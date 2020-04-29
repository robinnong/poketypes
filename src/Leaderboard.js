import React, { Component } from 'react'; 
import UserScores from './UserScores';

class Leaderboard extends Component {  
 
    render() {
        return( 
            <>
                <button className="homeButton" onClick={this.props.showHome}>
                    <i className="fas fa-home"></i>
                </button> 
                <div className="leaderboard">
                    <h3>Leaderboard</h3>
                    <i className="fas fa-crown"></i>
                    <ol> 
                        {this.props.users.map((user, index) => {
                            return (
                                <UserScores
                                    key={index}
                                    rank={index+1}
                                    name={user.name}
                                    score={user.score}
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