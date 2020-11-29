import React, {useState, useEffect } from 'react'

import { RegionView } from './RegionView'
import { TeamsPerRegion } from './TeamsPerRegion'
import { PlayersPerTeam } from './PlayersPerTeam'

export const StatsQuery = () => {
  const [view, setView] = useState(1); // 3 views. 1=>regions 2=>teams per region 3=> players per team
  const [region, setRegion] = useState(null); // one of 'EU', 'NA', 'KR', 'CN'
  const [team, setTeam] = useState('') // team name to query from
  
  return (
      view===1 && <RegionView setView={setView} setRegion={setRegion} />
      || view===2 && <TeamsPerRegion setView={setView} setTeam={setTeam} region={region} />
      || view===3 && <RegionView team={team} />
  )
  
}

export default StatsQuery