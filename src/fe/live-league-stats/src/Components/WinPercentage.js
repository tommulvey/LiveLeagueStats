import React from 'react'
//import './WinPercentageStyling.css'

const heading={
    color: 'green',
    top: '0px',
    height: '500px',
    width: '1450px',
    border: '20px solid green',
    fontSize: '80px'
}
function PlayerStats(){
    //    let className=props.primary ? 'primary' : ""
        return(
            <h1 style={heading}>WinPercentage</h1>

        )
    }
    export default PlayerStats;