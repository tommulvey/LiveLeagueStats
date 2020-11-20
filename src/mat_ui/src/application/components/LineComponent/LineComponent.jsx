import React, { Component, useState, useEffect } from 'react';
import LineChart from 'react-linechart';

const getTime = (time) => {
    return (time).toFixed()-243+""
}

export const LineComponent = ({gameId, time}) => {
  const [lineData, setLineData] = useState([]);

  const data = [
  {									
    color: "steelblue", 
    points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}] 
  }];

//   useEffect(() => {
//     // GET request using fetch inside useEffect React hook
//     const id = '104174992730350841';
//     fetch('http://127.0.0.1:5000/getLC/'+id+'/'+getTime(time))
//       .then(async response => {
//         const res = await response.json();
//         // check for error response
//         if (!response) {
//             // get error message from body or default to response statusText
//             console.error('errrrr')
//         }
//         // console.log('res is ', response)
//         // console.log('data.', res)
//         //setLineData(res)
//       })
//       .catch(error => {
//           this.setState({ errorMessage: error.toString() });
//           console.error('There was an error!', error);
//       });
//       // 37:57 end
//       // 32:10 ded
//       // empty dependency array means this effect will only run once (like componentDidMount in classes)
//   }, [time]);

  return (
    <div>
      {/* <div className="lc">
          <LineChart 
            width={600}
            height={400}
            data={[
                color: 'steelblue',
                points: {data}
            ]}
            yLabel={"Seconds Elapsed"}
            yMin={0}
            yMax={100}
            xMin={0}
          />
      </div>				 */}
      <h2> chart here </h2>
    </div>
    );
}