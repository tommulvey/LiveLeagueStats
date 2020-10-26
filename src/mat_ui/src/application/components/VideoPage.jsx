import React, { Component, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import PlayerStats from "./VideoComponents/PlayerStats"
import './VideoComponents/Video'
import Video from "./VideoComponents/Video"
/* static imports */
import '../styles/Video.css'
import { Data } from './Charts/Charts'
import { TimeIntegration } from './Demo/integrations'

export const VideoPage = () => {
  const [time, setTime] = useState(0);
  const [videoSeconds, setVidSecs] = useState(0);

  return (
    <div>
    <div className="vid-page-wit-stats">
      <TimeIntegration time={time}/>
      <div className="left-vid">
        <Video setTime={setTime}/>
      </div>
      <div className="right-stats-players">
        <PlayerStats />
      </div>
    </div>
    <div className="line-chart">
        <Data />
      </div>
    </div>
  )
  
}

export default VideoPage