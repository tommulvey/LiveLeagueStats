import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const getTime = (time) => {
  return (time).toFixed()-243+""
}

const d = [
  { title: 'One', value: 10, color: '#E38627' },
  { title: 'Two', value: 15, color: '#C13C37' },
  { title: 'Three', value: 20, color: '#6A2135' },
]

function FullOption({FullOptionData}) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  console.log('OUR DATA IS ',FullOptionData[0] )
  const fdata = FullOptionData.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={fdata}
      radius={6}
      lineWidth={60}
      // segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      // segmentsShift={(index) => (index === selected ? 6 : 1)}
      // animate
      // label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      // labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export const PieChartComponents = ({gameId, time}) => {
  const [data, setData] = useState([]);
  const id = '104174992730350841';

  console.log('time is...', time)
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://127.0.0.1:5000/pieCharts/'+id+'/'+getTime(time))
      .then(async response => {
        const res = await response.json();
        // check for error response
        if (!response) {
            // get error message from body or default to response statusText
            console.error('errrrr')
        }
        // console.log('res is ', response)
        console.log('data.', res)
        setData(res)
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
      // 37:57 end
      // 32:10 ded
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [time]);

  return (
    <React.Fragment>
      <table>
        <tbody>
          <tr key={0}>
            <td height={"5vh"} > { data ? ( <PieChart data={data[0]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[1]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[2]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[3]} animate={true} radius={20} /> ) : ""} </td>
          </tr>
          <tr key={1}>
          <td height={"5vh"} > { data ? ( <PieChart data={data[4]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[5]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[6]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[7]} animate={true} radius={20} /> ) : ""} </td>
          </tr>
          <tr key={3}>
          <td height={"5vh"} > { data ? ( <PieChart data={data[8]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[9]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[10]} animate={true} radius={20} /> ) : ""} </td>
            <td height={"5vh"}> { data ? ( <PieChart data={data[11]} animate={true} radius={20} /> ) : ""} </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default PieChartComponents;