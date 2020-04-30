import React from 'react'

const UserScores = (props) => { 
    return (
        <li>
            <div>
                <p className="rank">{props.rank}</p>
                <p className="userName">{props.name}</p>
            </div>
            <p className="score">{props.score}</p>
        </li>
    ) 
}

export default UserScores;