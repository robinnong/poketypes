import React from "react";

export const UserScores = ({ index, name, rank, score }) => {
  let color;
  if (index === 0) {
    color = "gold";
  } else if (index === 1) {
    color = "silver";
  } else if (index === 2) {
    color = "bronze";
  }

  return (
    <li>
      <div>
        <p className="rank">{rank}</p>
        <p className="userName">{name}</p>
        {index < 3 ? <i className={`fas fa-medal ${color}`} /> : null}
      </div>
      <p className="score">{score}</p>
    </li>
  );
};
