import React from "react";
import UserScores from "./UserScores";
import { ScoreBoard } from "./styles";

// This function component only receives props from parent (App.js) and has no state
export const Leaderboard = ({ showHome, users }) => {
  return (
    <div className="leaderboard wrapper">
      <button className="homeButton" onClick={showHome}>
        <i className="fas fa-home" aria-hidden="true" />
        <span>Back to Home</span>
      </button>
      <ScoreBoard className="animated fadeInLeft">
        <i className="fas fa-crown" aria-hidden="true" />
        <div className="headerBackground">
          <h3>Leaderboard</h3>
        </div>
        <ol>
          {users.map((user, index) => {
            return (
              <UserScores
                key={index}
                index={index}
                rank={index + 1}
                name={user.name}
                score={user.score}
              />
            );
          })}
        </ol>
      </ScoreBoard>
    </div>
  );
};
