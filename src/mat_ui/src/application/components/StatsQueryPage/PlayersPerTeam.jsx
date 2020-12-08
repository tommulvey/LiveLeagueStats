import React from 'react'
import {makeStyles} from '@material-ui/styles'
import playerData from './totalplayer.json'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  teamNameText:{
      fontSize: "400%",
      fontWeight: 'bold'
  }
})

export const PlayersPerTeam = ({team, setView}) => {
  const classes=useStyles();
  const playerInfo=[
    playerData.find(player => player.Team===team && player.Role==='Top'),
    playerData.find(player => player.Team===team && player.Role==='Mid'),
    playerData.find(player => player.Team===team && player.Role==='Jungle'),
    playerData.find(player => player.Team===team && player.Role==='Bot'),
    playerData.find(player => player.Team===team && player.Role==='Support')
  ]

  console.log(playerInfo)
      return ( 
          <Grid container justify='center'>
          <Typography align='center' className={classes.teamNameText}>{team} </Typography>
          <Grid item xs={12}>
          {Object.keys(playerInfo).map(el => {
              if (playerInfo[el]==null){
                return(
                  <Paper variant='outlined'>
                <Typography align='center'>
                Free agency in progress. Player not signed yet.
                </Typography>
                </Paper>
                )
              }
              else{
                  const {Player, Name, Role}=playerInfo[el]
                  /*console.log(Player)
                  console.log(Name)
                  console.log(Role)*/
                  return(
                    <Paper variant='outlined'>
                    <Typography align='center'>
                      Player: {Player}
                    </Typography>
                    <Typography align='center'>
                      Name: {Name}
                    </Typography>
                    <Typography align='center'>
                      Role: {Role}
                    </Typography>
                    </Paper>
                  )
                }
            }
          )}
            </Grid>
          </Grid>
        )
      }


export default PlayersPerTeam;
