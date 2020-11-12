import React from "react";
import PlayerRow from "./VideoComponents/PlayerRow";
import "./VideoComponents/Video";
import Video from "./VideoComponents/Video";
/* static imports */
import "../styles/Video.css";

export default class VideoPage extends React.Component {
  render() {
    return (
      <div class="vid-page-wit-stats">
        <div class="left-vid">
          <Video />
        </div>
        <div class="right-stats-players">
          <PlayerRow />
        </div>
      </div>
    );
  }
}
