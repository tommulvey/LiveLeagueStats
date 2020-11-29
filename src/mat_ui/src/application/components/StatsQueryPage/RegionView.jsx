import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

export const RegionView = ({setRegion, setView}) => {
  return ( 
    <div className='regionsView'>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={4}>
            <Paper className="region-lcs">
              <Button onClick={() => { alert('clicked') }}><img src={"./Icons/lcp.png"} alt={"LCS"} /></Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="region-lec">LEC</Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={4}>
            <Paper className="region-lck">LCK</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="region-lpl">LPL</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default RegionView;
