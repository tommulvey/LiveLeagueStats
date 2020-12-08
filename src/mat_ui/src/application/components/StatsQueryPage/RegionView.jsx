import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
//import Typography from 'material-ui/styles/typography';

const ICONS = {
  'lec' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lec.jpeg',
  'lcs' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lcs.png',
  'lck' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lck.jpeg',
  'lpl' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lpl.png'
}

export const RegionView = ({setRegion, setView}) => {

  return ( 
    <div className='regionsView'>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={4} justify='center'>
          <Grid item xs={3}>
            <Paper className="region-lcs">
              <Button id="lcs" onClick={(e) => {setRegion('lcs'); setView(2)}} variant='outlined'><img src={ICONS['lcs']} height={"150vh"} alt={"LCS"} />
              League of Legends Championship Series
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="region-lec">
            <Button id="lec" onClick={(e) => {setRegion('lec'); setView(2)}} variant='outlined'><img src={ICONS['lec']} height={"150vh"} alt={"LEC"} />
            League of Legends European Championship</Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={4} justify='center'>
          <Grid item xs={3}>
            <Paper className="region-lck">
            <Button id="lck" onClick={(e) => {setRegion('lck'); setView(2)}} variant='outlined'><img src={ICONS['lck']} height={"150vh"} alt={"LCK"} />
            League of Legends Champions Korea</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="region-lpl">
            <Button id="lpl" onClick={(e) => {setRegion('lpl'); setView(2)}} variant='outlined'><img src={ICONS['lpl']} height={"150vh"} alt={"LPL"} />
            League of Legends Pro League
            </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default RegionView;
