import React from "react"
import { PlayerRows } from './PlayerRows'
import '../../styles/Video.css'

export const PlayerStats = ({gameId, time}) => {
    return (
      <React.Fragment>
        {/* <p> Team 1 vs Team 2 </p> */}
        <PlayerRows gameId={gameId} time={time}/>
      </React.Fragment>
    )
}
