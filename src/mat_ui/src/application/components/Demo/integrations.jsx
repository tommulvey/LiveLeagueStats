/* these are alex and toms integrations for demo 1lol
dont take this code seriouslyt anyone 
*/

import React, { Component, useState } from 'react';
import { timeData } from './timeStats'

const delta = 243
const fmtMSS = (s) => { return(s-(s%=60))/60+(9<s?':':':0')+s }

const convert = (time) => {
  const t = time - delta
  return fmtMSS(Math.round(t))
}

export const TimeIntegration = ({ time }) => {

  const t = convert( { time }.time )
  
  // console.log(timeData["0"])
  
  const percents = Math.round(({time}.time - delta) / 10) * 10
  // console.log(timeData, percents, timeData["10"], timeData["10"].blue)
  var blue = ( timeData[ percents ] === undefined) ? 'n/a' :  timeData[ percents ].blue;
  var red = ( timeData[ percents ] === undefined) ? 'n/a' :  timeData[ percents   ].purp;
  console.log('timeData[{ percents }] : ', timeData[percents], 'ah ', percents)
  // console.log(percents)
  return <h1> timeInGame: { t } | blue: {blue}%  red: {red}%  </h1>
  //return <h1> timeInGame: { t } | blue: %  red: %  </h1>
}