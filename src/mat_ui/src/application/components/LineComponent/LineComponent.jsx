import React, { lazy, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
const CanvasJSChart  = loadable(() => import('../../assets/canvasjs.react'))

const getTime = (time) => {
    return (time).toFixed()-243+""
}

export const LineComponent = ({gameId, time}) => {

  const [data, setData] = useState([
    {x:0, y:0}
  ]);
  const id = '104174992730350841';

  useEffect(() => {
  // GET request using fetch inside useEffect React hook
    fetch('http://127.0.0.1:5000/getLC/'+id+'/'+getTime(time))
      .then(async response => {
        const res = await response.json();
        // check for error response
        if (!response) {
            // get error message from body or default to response statusText
            //console.error('errrrr')
        }
        // console.log('res is ', response)
        const d = []
        Object.entries(res).map((v) => d.push(v[1]))
        // console.log('LC  data.', d)
        setData(d)
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          //console.error('There was an error!', error);
      });
    // 37:57 end
    // 32:10 ded
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [time]);

  const options = {
      animationEnabled: true,
      theme: "dark2",
      title:{
          text: "Live Win %"
      },
      toolTip: {
          shared: true
      },
      legend:{
          cursor: "pointer"
      },
      axisX:{
        title:'Seconds Elapsed',
        includeZero: true,
        crosshair: {
          enabled: true
        }
      },
      axisY: {
        title: "Win %",
        includeZero: true,
        crosshair: {
          enabled: true
        }
      },
      data: [{
          type: "line",
          name: "Blue Team",
          showInLegend: "true",
          // xValueFormatString: "Stat, MMM",
          // yValueFormatString: "$#,##0",
          dataPoints: data
      }]
  }

  return (
      <div>
        <CanvasJSChart options = {options} />
      </div>
  )

}