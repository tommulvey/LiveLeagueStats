import React from "react";
import Player from "./SinglePlayerStats";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

const PlayerRow = (props) => {
  return (
    <Grid container>
      <Grid>
        <div>
        <Player />
        <Player />
        </div>
      </Grid>
    </Grid>
  );
};

export default PlayerRow;
