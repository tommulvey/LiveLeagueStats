import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import lck from "./RegionTeams/LCKsummer2020 (1).json"; 
import lcs from "./RegionTeams/nasummer2020 (1).json"; 
import lpl from "./RegionTeams/lplsummer2020 (1).json"; 
import lec from "./RegionTeams/eusummer2020 (1).json";
 ; 

const useStyles = makeStyles({
  regionText:{
      fontSize: "400%",
      fontWeight: 'bold'
  },
  teamText:{
    padding:'30%'
  }
})

const teams = {
    'lec': lec.lec,
    'lck': lck.lck,
    'lpl': lpl.lpl,
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
  const classes = useStyles();
  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
    <Typography align='center' className={classes.regionText}>{region.toUpperCase()} </Typography></Grid>
    <Grid className="teamsbyregion">
      <Grid container xs={12} direction='row'> <Grid item xs={6}><Typography> TEAM </Typography> </Grid>
      <Grid item xs={6}> <Typography> WINS/LOSSES </Typography></Grid></Grid>
      {teamsRegion.sort((a, b) => comp(a,b)).map(
        (item, i) => <Grid container key={i}> 
          <Button id={item.Team} onClick={(e) => {setTeam(item.Team); setView(3)}}>
            <Grid container xs={12}> 
            
              {item.Team+" "}{item.WinGames}/{item.LossGames}
             
              </Grid>
            </Button></Grid> 
      )}
    </Grid>
    </Grid>
  )
}

export default TeamsPerRegion;
