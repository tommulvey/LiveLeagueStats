import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import './App.css';
import LiveLeagueStatsBanner from './Components/LiveLeagueStatsBanner'
import LiveVideoStream from './Components/LiveVideoStream'
import PlayerStats from './Components/PlayerStats'
import WinPercentage from './Components/WinPercentage'

function App() {
  return (
    <div className="App">
      <LiveLeagueStatsBanner />
      <LiveVideoStream />
      <PlayerStats />
      <WinPercentage />

    </div>
  );
}

export default App;
