
import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./SinglePlayerStats";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import "../../styles/Video.css";
import FaceIcon from "@material-ui/icons/Face";
import PlayerRow from "./PlayerRow";

/*eslint-env es6*/

/*export const PlayerStats = () => {
  
  const [playerData, setPlayerData]=useState();
  useEffect(() => {
  axios
    .get("https://5f5ef625df620f00163e5152.mockapi.io/FakeDataForFrontEnd/")
    .then(result => {
      const data = result.data
      setPlayerData(data)
      console.log(data)
      })
    },[]);

    return (
      <div>
        {playerData ? (
          <Grid container>
            {console.log("Looking for player data")}
            {}
            {Object.keys(playerData).map((id) => playerProfile(id))}
            
          </Grid>
        ) : (
          <Grid container>
            {console.log("ERROR: Could not find player data")}
            <Typography>Sorry there is nothing</Typography>
            </Grid>
        )}
      
      <Grid container>
      <PlayerRow Playername={playerData.Playername} 
                 Gold={playerData.Gold}
                 Killed={playerData.Killed}
                 Death={playerData.Dearth} 
                 Assist={playerData.Assist}/> 
     </Grid>
     </div>
    );

}
  */
 /* const [playerData, setPlayerData] = useState();
  
    useEffect(() => {
      axios
          .get("")
          .then(result => {
            const data = result.data
            setPlayerData(data)
            console.log(data)
          })
    },[]);
    return <PlayerRow />;
})*/
