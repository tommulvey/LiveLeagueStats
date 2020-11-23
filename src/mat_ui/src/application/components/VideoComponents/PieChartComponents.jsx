import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import loadable from '@loadable/component';
const CanvasJSChart  = loadable(() => import('../../assets/canvasjs.react'))
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const PC = ({data, index, people, label}) => {
  const d = data[index]
  // console.log(data)
  // console.log(index)
  // console.log('PEOPELPEOPE', people)
  // console.log(people[0].summonerName)
  const options1= {
    animationEnabled: true,
    theme: "dark2",
    title:{
        text: label
    },
    toolTip: {
        shared: true
    },
    exportFileName: "Doughnut Chart",
    legend:{
        cursor: "pointer"
        // itemclick: this.toggleDataSeries
    },
    data: [{
        type: "doughnut",
        innerRadius: 90,
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
            { y: d[0].y, name: people.find(o => o.participantId === d[0].participantId).summonerName },
            { y: d[1].y, name: people.find(o => o.participantId === d[1].participantId).summonerName },
            { y: d[2].y, name: people.find(o => o.participantId === d[2].participantId).summonerName },
            { y: d[3].y, name: people.find(o => o.participantId === d[3].participantId).summonerName },
            { y: d[4].y, name: people.find(o => o.participantId === d[4].participantId).summonerName },
        ]
    }]
  }
  
  return(<CanvasJSChart options = {options1} />)
}

export function PieChartComponents({gameId, time}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([ [{"color": "#003366","participantId": 1,"y": 0.35000698296517324},{"color": "#3366cc","participantId": 2,"y": 0.17145142782741818 },{"color": "#00ffcc","participantId": 3,"y": 0.3059315550909614},{"color": "#000066","participantId": 4,"y": 0.05329690720921173 },{"color": "#33cccc","participantId": 5,"y": 0.11931312690723542}],[{"color": "#660066","participantId": 6,"y": 0.44142527094208334}, {"color": "#993366","participantId": 7,"y": 0.016456132497926105},{"color": "#9900ff","participantId": 8,"y": 0.1078074451528609 },{"color": "#990033","participantId": 9,"y": 0.16747481993848873},{"color": "#cc99ff","participantId": 10,"y": 0.2668363314686409} ],[{"color": "#003366","participantId": 1,"y": 3743},{"color": "#3366cc","participantId": 2,"y": 3619},{"color": "#00ffcc","participantId": 3, "y": 3907},{"color": "#000066","participantId": 4,"y": 3892},{"color": "#33cccc","participantId": 5,"y": 2273}],[{"color": "#66006", "participantId": 6,"y": 3566},{"color": "#993366","participantId": 7,"y": 3557},{"color": "#9900ff","participantId": 8,"y": 3926}, {"color": "#990033","participantId": 9,"y": 3657},{"color": "#cc99ff","participantId": 10,"y": 2373}],[{ "color": "#003366","participantId": 1,"y": 0},{"color": "#3366cc","participantId": 2,"y": 0},{"color": "#00ffcc","participantId": 3, "y": 0},{"color": "#000066","participantId": 4,"y": 0},{"color": "#33cccc","participantId": 5,"y": 0}],[{"color": "#660066", "participantId": 6,"y": 0},{"color": "#993366","participantId": 7,"y": 0},{"color": "#9900ff","participantId": 8,"y": 0 },{"color": "#990033","participantId": 9,"y": 0},{"color": "#cc99ff","participantId": 10,"y": 0}],[{"color": "#003366","participantId": 1, "y": 0 }, { "color": "#3366cc", "participantId": 2, "y": 0 }, { "color": "#00ffcc", "participantId": 3, "y": 0 }, { "color": "#000066", "participantId": 4, "y": 0 }, { "color": "#33cccc", "participantId": 5, "y": 0 } ], [ { "color": "#660066", "participantId": 6, "y": 0 }, { "color": "#993366", "participantId": 7, "y": 0 }, { "color": "#9900ff", "participantId": 8, "y": 0 }, { "color": "#990033", "participantId": 9, "y": 0 }, { "color": "#cc99ff", "participantId": 10, "y": 0 } ], [ { "color": "#003366", "participantId": 1, "y": 96 }, { "color": "#3366cc", "participantId": 2, "y": 79 }, { "color": "#00ffcc", "participantId": 3, "y": 112 }, { "color": "#000066", "participantId": 4, "y": 102 }, { "color": "#33cccc", "participantId": 5, "y": 13 } ], [ { "color": "#660066", "participantId": 6, "y": 93 }, { "color": "#993366", "participantId": 7, "y": 78 }, { "color": "#9900ff", "participantId": 8, "y": 117 }, { "color": "#990033", "participantId": 9, "y": 98 }, { "color": "#cc99ff", "participantId": 10, "y": 9 } ], [ { "color": "#003366", "participantId": 1, "y": 3 }, { "color": "#3366cc", "participantId": 2, "y": 3 }, { "color": "#00ffcc", "participantId": 3, "y": 3 }, { "color": "#000066", "participantId": 4, "y": 4 }, { "color": "#33cccc", "participantId": 5, "y": 8 } ], [ { "color": "#660066", "participantId": 6, "y": 5 }, { "color": "#993366", "participantId": 7, "y": 4 }, { "color": "#9900ff", "participantId": 8, "y": 5 }, { "color": "#990033", "participantId": 9, "y": 4 }, { "color": "#cc99ff", "participantId": 10, "y": 2 } ], [ { "color": "#003366", "participantId": 1, "y": 1 }, { "color": "#3366cc", "participantId": 2, "y": 3 }, { "color": "#00ffcc", "participantId": 3, "y": 0 }, { "color": "#000066", "participantId": 4, "y": 0 }, { "color": "#33cccc", "participantId": 5, "y": 0 } ], [ { "color": "#660066", "participantId": 6, "y": 0 }, { "color": "#993366", "participantId": 7, "y": 1 }, { "color": "#9900ff", "participantId": 8, "y": 1 }, { "color": "#990033", "participantId": 9, "y": 0 }, { "color": "#cc99ff", "participantId": 10, "y": 1 } ] ]);
  const [participants, setParticipants] = useState([
    {participantId: 1, summonerName: '--'},
    {participantId: 2, summonerName: '--'},
    {participantId: 3, summonerName: '--'},
    {participantId: 4, summonerName: '--'},
    {participantId: 5, summonerName: '--'},
    {participantId: 6, summonerName: '--'},
    {participantId: 7, summonerName: '--'},
    {participantId: 8, summonerName: '--'},
    {participantId: 9, summonerName: '--'},
    {participantId: 10, summonerName: '--'}
  ])
  const id = '104174992730350841';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        // console.log('data.', res)
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

  useEffect(() => {
    //matchMetadata
    fetch('http://127.0.0.1:5000/matchMetadata/'+id)
      .then(async response => {
        const res = await response.json();
        if (!response) {
            console.error('errrrr participants')
        }
        // console.log('data.', res)
        // setParticipants(res.participants)
        /*
          {
              "championId": "Ornn",
              "esportsPlayerId": "98926509798242286",
              "participantId": 1,
              "role": "top",
              "summonerName": "FLY Solo"
          },
        */
        // console.log('PLAYERS OBJ', res)
        const ps = [] // 
        Object.entries(res.participants).map(o => ps.push({ participantId: o[1].participantId, summonerName: o[1].summonerName} ))
        setParticipants(ps)
        // console.log('PLATERS = ', ps)
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
          setParticipants('crap')
      });
  }, []);

  /*
  T1_DMG = []#1
  T2_DMG = []#2
  T1_GLD = []#3
  T2_GLD = []#4
  T1_KLS = [] #kills #5
  T2_KLS = []#6
  T1_DTS = [] #deaths #7
  T2_DTS = []#8
  T1_CS = [] #creepScore #9
  T2_CS = []#10
  T1_WP = []#11
  T2_WP = [] #wardsPlaced #12
  T1_WD = [] #wardsDestroyed #13
  T2_WD = [] #14
  */

  return (
    <div className="charts area">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Gold" {...a11yProps(0)} />
          <Tab label="Kills" {...a11yProps(1)} />
          <Tab label="Deaths" {...a11yProps(2)} />
          <Tab label="Damage" {...a11yProps(3)} />
          <Tab label="Creep Score" {...a11yProps(4)} />
          <Tab label="Wards Placed" {...a11yProps(5)} />
          <Tab label="Wards Destroyed" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <div className="pies">
      <TabPanel value={value} index={0}>
        <div className="e1">
        <PC data={data} index={2} people={participants} label={'Blue Gold'} /></div>
        <div className="e2">
        <PC data={data} index={3} people={participants} label={'Purple Gold'}/></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="e1">
        <PC data={data} index={4} people={participants} label={'Blue Kills'} /></div>
        <div className="e2">
        <PC data={data} index={5} people={participants} label={'Purple Kills'}/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="e1">
        <PC data={data} index={6} people={participants} label={'Blue Deaths'} /></div>
        <div className="e2">
        <PC data={data} index={7} people={participants} label={'Purple Deaths'}/></div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="e1">
        <PC data={data} index={0} people={participants} label={'Blue Damage'} /></div>
        <div className="e2">
        <PC data={data} index={1} people={participants} label={'Purple Damage'}/></div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div className="e1">
        <PC data={data} index={8} people={participants} label={'Blue Creep Score'} /></div>
        <div className="e2">
        <PC data={data} index={9} people={participants} label={'Purple Creep Score'}/></div>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className="e1">
        <PC data={data} index={10} people={participants} label={'Blue Wards Placed'} /></div>
        <div className="e2">
        <PC data={data} index={11} people={participants} label={'Purple Wards Placed'}/></div>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <div className="e1">
        <PC data={data} index={12} people={participants} label={'Blue Wards Destroyed'} /></div>
        <div className="e2">
        <PC data={data} index={13} people={participants} label={'Purple Wards Destroyed'}/></div>
      </TabPanel>
      </div>
    </div>
  );
}

const getTime = (time) => {
  return (time).toFixed()-243+""
}

// export const PieChartComponents = ({gameId, time}) => {
//   const [data, setData] = useState([]);
//   const id = '104174992730350841';

//   console.log('time is...', time)
//   useEffect(() => {
//     // GET request using fetch inside useEffect React hook
//     fetch('http://127.0.0.1:5000/pieCharts/'+id+'/'+getTime(time))
//       .then(async response => {
//         const res = await response.json();
//         // check for error response
//         if (!response) {
//             // get error message from body or default to response statusText
//             console.error('errrrr')
//         }
//         // console.log('res is ', response)
//         console.log('data.', res)
//         setData(res)
//       })
//       .catch(error => {
//           this.setState({ errorMessage: error.toString() });
//           console.error('There was an error!', error);
//       });
//       // 37:57 end
//       // 32:10 ded
//       // empty dependency array means this effect will only run once (like componentDidMount in classes)
//   }, [time]);

//   return (
//     <React.Fragment>
//       <table>
//         <tbody>
//           <tr key={0}>
//             <td height={"5vh"} > { data ? ( <PieChart data={data[0]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[1]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[2]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[3]} animate={true} radius={20} /> ) : ""} </td>
//           </tr>
//           <tr key={1}>
//           <td height={"5vh"} > { data ? ( <PieChart data={data[4]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[5]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[6]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[7]} animate={true} radius={20} /> ) : ""} </td>
//           </tr>
//           <tr key={3}>
//           <td height={"5vh"} > { data ? ( <PieChart data={data[8]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[9]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[10]} animate={true} radius={20} /> ) : ""} </td>
//             <td height={"5vh"}> { data ? ( <PieChart data={data[11]} animate={true} radius={20} /> ) : ""} </td>
//           </tr>
//         </tbody>
//       </table>
//     </React.Fragment>
//   );
// }

export default PieChartComponents;