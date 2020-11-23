<<<<<<< Updated upstream
import React from "react"
import PlayerStats from "./VideoComponents/PlayerStats"
import './VideoComponents/Video'
import Video from "./VideoComponents/Video"
/* static imports */
import '../styles/Video.css'

export default class VideoPage extends React.Component {
  render() {
    return (
      <div class="vid-page-wit-stats">
        <div class="left-vid">
          <Video />
        </div>
        <div class="right-stats-players">
          <PlayerStats />
        </div>
      </div>
    )
  }
}
=======
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { PlayerStats } from "./VideoComponents/PlayerStats"

import './VideoComponents/Video'
import Video from "./VideoComponents/Video"
/* static imports */
import '../styles/Video.css'
import { LineComponent } from './LineComponent/LineComponent'
import { TimeIntegration } from './Demo/integrations'
import { PieChartComponents } from './VideoComponents/PieChartComponents'
import { BarCharts } from './VideoComponents/BarCharts'

export const VideoPage = (gameId) => {
  const [time, setTime] = useState(0);
  // const [pieChartData, setPieChartData] = useState([])
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
          <LineComponent gameId={gameId} time={time}/>
      </div>
      <div className="pie-chart">
        <PieChartComponents gameId={gameId} time={time} />
      <div className="barCharts" >
        <BarCharts gameId={gameId} time={time} />
      </div>
        
      </div>
    </div>
  )
  
}

// VideoPage.propTypes = {
//   gameId: PropTypes.string,
//   setGameId: PropTypes.function
// }


export default VideoPage
>>>>>>> Stashed changes
