import React from 'react'; 
import UserScores from './UserScores'; 
import { ScoreBoard } from './styles';

// This function component only receives props from parent (App.js) and has no state
const Leaderboard = (props) => {     
    return ( 
        <div className="leaderboard wrapper">
            <button className="homeButton" onClick={props.showHome}>
                <i className="fas fa-home" aria-hidden="true"></i>
                <span>Back to Home</span>
            </button> 
            <ScoreBoard className="animated fadeInLeft">
                <i className="fas fa-crown" aria-hidden="true"></i>
                <div className="headerBackground">
                    <h3>Leaderboard</h3>
                </div>
                <ol> 
                    {props.users.map((user, index) => {
                        return (
                            <UserScores
                                key={index}
                                index={index}
                                rank={index+1}
                                name={user.name}
                                score={user.score}
                            />
                        )})
                    }
                </ol>
            </ScoreBoard>  
        </div>
    )
} 

export default Leaderboard;