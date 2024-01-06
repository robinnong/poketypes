import React from "react";
import { Button } from "./styles";

export const GameOver = ({ finalScore, replay, submitUsername }) => {
  return (
    <div className="gameOver wrapper">
      <h2 className="animated bounceIn">Game Over</h2>
      <h3 className="endMessage animated fadeInUp">
        You caught <span>{finalScore}</span> Pokemon!
      </h3>
      <div className="buttonContainer">
        <Button isRed={true} onClick={replay}>
          Replay
          <i className="fas fa-reply" aria-hidden="true" />
        </Button>
        <Button isRed={false} onClick={submitUsername}>
          Next
          <i className="fas fa-share" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
