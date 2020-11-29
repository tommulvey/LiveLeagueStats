import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const ICONS = {
  'lec' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lec.png',
  'lcs' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lcs.png',
  'lck' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lck.jpeg',
  'lpl' : 'https://raw.githubusercontent.com/mulvenstein/LiveLeagueStats/master/src/mat_ui/src/application/components/StatsQueryPage/Icons/lpl.png'
}

export const RegionView = ({setRegion, setView}) => {
  return ( 
    <div className='regionsView'>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={4}>
            <Paper className="region-lcs">
              <Button onClick={() => { alert('clicked') }}><img src={ICONS['lcs']} height={"105vh"} alt={"LCS"} /></Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="region-lec">
              <Button onClick={() => { alert('clicked') }}><img src={ICONS['lec']} height={"105vh"} alt={"LEC"} /></Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={4}>
            <Paper className="region-lck">
              <Button onClick={() => { alert('clicked') }}><img src={ICONS['lck']} height={"105vh"} alt={"LCK"} /></Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="region-lpl">
              <Button onClick={() => { alert('clicked') }}><img src={ICONS['lpl']} height={"105vh"} alt={"LPL"} /></Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default RegionView;
