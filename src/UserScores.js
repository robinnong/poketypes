import React from 'react'

const UserScores = (props) => {  
    let color;
    if (props.index === 0) {
        color = "gold";
    } else if (props.index === 1) {
        color = "silver";
    } else if (props.index === 2) {
        color = "bronze";
    }
    
    return (
        <li>
            <div>
                <p className="rank">{props.rank}</p>
                <p className="userName">{props.name}</p>
                {props.index < 3 ? <i className={`fas fa-medal ${color}`}></i> : null}
            </div>
            <p className="score">{props.score}</p>
        </li>
    ) 
}

export default UserScores;