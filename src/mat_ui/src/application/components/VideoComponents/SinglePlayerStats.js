import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Video.css";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const Player = (props) => {

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

    const playerProfile = (id) => {
      const {Playername, Gold, Killed, Dearth: Death, Assist } = playerData[id];

    return (
      <Grid containter spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>
                {Playername}
                <MonetizationOnIcon />
                G:{Gold} K:{Killed} D:{Death} A:{Assist}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
};
 return (
    <div>
      {playerData ? (
        <Grid container>
          {console.log("Looking for player data")}
          {}
          {Object.keys(playerData).map((id) => playerProfile(id))}
          {console.log("Found data for player")}
        </Grid>
      ) : (
        <Grid container>
          {console.log("ERROR: Could not find player data")}
          <Typography>Sorry there is nothing</Typography>
          </Grid>
      )}
    </div>
  );
      };
export default Player;
