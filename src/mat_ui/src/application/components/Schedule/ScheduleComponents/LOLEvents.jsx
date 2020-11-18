import React, { useState, useEffect } from "react"; //
//import axios from "axios";
import { Grid, Typography, Divider, Button, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import mockMatchData from './data'

const useStyles=makeStyles({
    regionCardStyles:{
        backgroundColor: "#BB86FC"
    }
});

const videoSelected=()=>{

    console.log("User selected a match. Redirecting...");
}

const LOLEvents=()=>{
    const [matchData, setMatchData]=useState(mockMatchData);
    //const classes=useStyles();
    const getMatchData=(eventId)=>{
        //console.log(matchData);
        const {data}=matchData;
        //console.log(data)
        const {schedule}=data;
        //console.log(schedule)
        const {events}=schedule;
        //console.log(events)
        
        return (
            
        <Grid container>
            <Grid container spacing={4}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography align={'center'}>
                            NA
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography align={'center'}>
                            EU
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography align={'center'}>
                            KR
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography align={'center'}>
                            CH
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
            {events.map((eventData) =>{
                const { startTime,match }=eventData;
                //console.log(match)
                const { teams, id }=match;
                console.log(id);
                const { name:nameOne, image:imageOne}=teams[0];
                const { name:nameTwo, image:imageTwo}=teams[1];
                return (
                        <Grid item xs={12} spacing={6}>
                            <Button onClick={videoSelected}>
                            <div><Typography align="center">{startTime}</Typography></div>
                                <Typography align="center">
                                    <img src={imageOne} alt="new" width="10%" height="10%"/>  {nameOne} vs {nameTwo}  <img src={imageTwo} alt="new" width="10%" height="10%"/>  
                                </Typography>
                            </Button>
                            <Divider />
                        </Grid>
                )
            })}
        </Grid>
        )
    };
    return(
        <div>
        {matchData ? (
            <Grid container>
                {Object.keys(matchData).map((eventId)=>getMatchData(eventId))}
            </Grid>
        ) : (
            <Typography>
                No match data found
            </Typography>
        )}
    </div>
    )
}

export default LOLEvents