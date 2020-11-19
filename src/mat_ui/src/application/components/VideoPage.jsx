import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { PlayerStats } from "./VideoComponents/PlayerStats"

import './VideoComponents/Video'
import Video from "./VideoComponents/Video"
/* static imports */
import '../styles/Video.css'
// import { Data } from './Charts/Charts'
import { TimeIntegration } from './Demo/integrations'

export const VideoPage = (gameId) => {
  const [time, setTime] = useState(0);

  return (
    <div>
      <div className="vid-page-wit-stats">
        <TimeIntegration time={time}/>
        <div className="left-vid">
          <Video setTime={setTime}/>
        </div>
        <div className="right-stats-players">
          <PlayerStats gameId={gameId} time={time} />

        </div>
      </div>
      <div className="line-chart">
          {/* <Data /> */}
      </div>
      <div>
        
      </div>
    </div>
  )
  
}

// VideoPage.propTypes = {
//   gameId: PropTypes.string,
//   setGameId: PropTypes.function
// }


export default VideoPage