import React from 'react'
import Button from '@material-ui/core/Button'
import lck from "./RegionTeams/LCKsummer2020 (1).json"; 
import lcs from "./RegionTeams/nasummer2020 (1).json"; 
import lpl from "./RegionTeams/lplsummer2020 (1).json"; 
import lec from "./RegionTeams/eusummer2020 (1).json"; ; 
const teams = {
    'lec': lec.lec,
    'lck': lck.lck,
    'lpl': lpl.lck,
    'lcs': lcs.lcs
}

function comp(a,b){
    if (a.WinGames > b.WinGames)
      return -1
      if (a.WinGames < b.WinGames)
      return 1
    return 0
}

export const TeamsPerRegion = ({setTeam, setView, region}) => {
  const teamsRegion = teams[region]
  return (
    <React.Fragment>
    <h1> Region : {region} </h1>
    <div className="teamsbyregion">
      <div> <p> TEAM. WINS. LOSSES. </p> </div>
      {teamsRegion.sort((a, b) => comp(a,b)).map(
        (item, i) => <div key={i}> 
          <Button id={item.Team} onClick={(e) => {setTeam(item.Team); setView(3)}}> {item.Team} {item.WinGames} {item.LossGames} </Button>
        </div>
      )}
    </div>
    </React.Fragment>
  )
}

export default TeamsPerRegion;
