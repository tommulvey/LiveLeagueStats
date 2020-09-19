import React from "react"
import PlayerStats from "./VideoComponents/PlayerStats"
import './VideoComponents/Video'
import Video from "./VideoComponents/Video"

export default class VideoPage extends React.Component {
  render() {
    return (
      <div id="VideoPage">
        <Video />
        <PlayerStats />
      </div>
    )
  }
}
