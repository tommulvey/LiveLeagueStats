import React from "react"
import { PlayerRows } from './PlayerRows'
import '../../styles/Video.css'

export const PlayerStats = ({gameId, time}) => {
    return (
      <PlayerRows gameId={gameId} time={time}/>
    )
}
