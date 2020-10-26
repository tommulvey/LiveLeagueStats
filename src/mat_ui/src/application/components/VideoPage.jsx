import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import PlayerStats from "./VideoComponents/PlayerStats"
import './VideoComponents/Video'
import Video from "./VideoComponents/Video"
/* static imports */
import '../styles/Video.css'

export default class VideoPage extends React.Component {
  render() {
    return (
      <div className="vid-page-wit-stats">
        <div className="left-vid">
          <Video />
        </div>
        <div className="right-stats-players">
          <PlayerStats />
        </div>
      </div>
    )
  }
}
