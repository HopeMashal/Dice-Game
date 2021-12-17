import React from "react";

function Player(props){
  return(
    <div className={`player-panel ${props.active} ${props.winner}`}>
      <div className="player-name">{props.player}</div>
      <div className="player-score">{props.score}</div>
      <div className="player-current-box">
        <div className="player-current-label">Current</div>
        <div className="player-current-score">{props.currentscore}</div>
      </div>
    </div>
  )
}

export default Player;