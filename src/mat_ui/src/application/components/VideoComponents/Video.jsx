import React from "react";
import "../../styles/Video.css";

export default class Video extends React.Component {
  render() {
    return (
      <div id="video">
        <iframe
          title="liveVid"
          src="https://www.youtube.com/embed/bXFTmt-Pb2M?start=257"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
      picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}

/* ex iframe vid
<iframe width="560" height="315" src="https://www.youtube.com/embed/bXFTmt-Pb2M?start=257" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/
