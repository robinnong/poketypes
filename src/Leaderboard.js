import React from 'react'; 
import UserScores from './UserScores';

// This function component only receives props from parent (App.js) and has no state
const Leaderboard = (props) => {   
    return ( 
        <div className="leaderboardComponent wrapper">
            <button className="homeButton" onClick={props.showHome}>
                <i className="fas fa-home" aria-hidden="true"></i>
                <span>Back to Home</span>
            </button> 
            <div className="leaderboard animated fadeInLeft">
                <h3>Leaderboard</h3>
                <i className="fas fa-crown" aria-hidden="true"></i>
                <ol> 
                    {props.users.map((user, index) => {
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
        </div>
    )
} 

export default Leaderboard;