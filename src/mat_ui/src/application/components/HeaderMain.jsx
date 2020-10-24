import React, { Component } from 'react';
import '../styles/HeaderMain.css'
import Typography from '@material-ui/core/Typography';

export default class HeaderMain extends React.Component {
  render() {
    return (
      <div className="App">
        <Typography variant="h3" color="inherit">Live League Stats</Typography>
      </div>
    );
  }
}
