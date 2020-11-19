import React, { useState, useEffect } from "react"; //
//import axios from "axios";
import { Grid, Typography, Button, Card, CardContent } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles"
import mockMatchData from './data'

/*const useStyles=makeStyles({
    regionCardStyles:{
        backgroundColor: "#BB86FC"
    }
});*/

function videoSelected(id){
    console.log("User selected match id:",id+".","Redirecting...");
    //console.log(id)
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
            <Grid container spacing={10}>
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
                //console.log(id);
                const { name:nameOne, image:imageOne}=teams[0];
                const { name:nameTwo, image:imageTwo}=teams[1];
                const matchDate=startTime.slice(0,10)
                const matchStart=startTime.slice(11,16)
                return (
                    <Button keys={id} variant="outlined" onClick={videoSelected.bind(videoSelected,id)}>
                    
                    <Grid container item xs={12} spacing={2}>
                                <Grid item xs={1}>
                                    <div>{matchDate}</div>
                                    <div>{matchStart}</div>
                                </Grid>
                                <Grid container item xs={11} justify='center'>
                                    <Grid item xs={2}>
                                        <Typography align="right">
                                            {nameOne} 
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={1}>
                                        <Typography>
                                        <img src={imageOne} alt="new" width="50%" height="50%"/>
                                        </Typography>
                                        </Grid>
                                    
                                   
                                        <Typography align="center">
                                            vs
                                        </Typography>
                                        
                                    <Grid item xs={1}>  
                                        <Typography>
                                        <img src={imageTwo} alt="new" width="50%" height="50%"/>
                                        </Typography>
                                        </Grid>
                                    <Grid item xs={2}>
                                        <Typography align='left'>
                                        {nameTwo}
                                        </Typography>
                                        </Grid>
                                          </Grid>
                                    
                            </Grid>
                       
                    </Button>
                    
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