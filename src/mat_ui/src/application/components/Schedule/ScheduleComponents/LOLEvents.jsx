import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Card, CardContent } from "@material-ui/core";
import mockMatchData from './data'


function videoSelected(id){
    console.log("User selected match id:",id+".","Redirecting..."); //When match button is clicked, prints message including match id into browser console.

}


const LOLEvents=({setView})=>{
    const [matchData, setMatchData]=useState(mockMatchData);
    const getMatchData=(eventId)=>{
        const {data}=matchData;
        const {schedule}=data;
        const {events}=schedule;
        
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
                const { teams, id }=match;
                const { name:nameOne, image:imageOne}=teams[0];
                const { name:nameTwo, image:imageTwo}=teams[1];
                const matchDate=startTime.slice(0,10)
                const matchStart=startTime.slice(11,16) 
                return (
                    // <Button keys={id} variant="outlined" onClick={videoSelected.bind(videoSelected,id)}></Button>
                    <Button keys={id} variant="outlined" onClick={(id) => {setView(1)}}>
                    
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