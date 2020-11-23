import React, { lazy, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
// import CanvasJSChart from '../../assets/canvasjs.react'
// const importView = () =>
//   lazy(() =>
//     import('../../assets/canvasjs.react')
//   );
const CanvasJSChart  = loadable(() => import('../../assets/canvasjs.react'))

const getTime = (time) => {
    return (time).toFixed()-243+""
}

export const BarCharts = ({gameId, time}) => {

  const [data, setData] = useState({
      'red' : [-1,-1,-1,-1],
      'blue' : [-1,-1,-1,-1]
  });
  const id = '104174992730350841';

  console.log('time is...', time)
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://127.0.0.1:5000/barGraphs/'+id+'/'+getTime(time))
      .then(async response => {
        const res = await response.json();
        // check for error response
        if (!response) {
            // get error message from body or default to response statusText
            console.error('errrrr')
        }
        // console.log('res is ', response)
        console.log('bc data.', res)
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

    const options1 = {
        animationEnabled: true,
        theme: "dark2",
        title:{
            text: "Comparative Advantages"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer"
            // itemclick: this.toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Blue Team",
            showInLegend: "true",
            // xValueFormatString: "Stat, MMM",
            // yValueFormatString: "$#,##0",
            dataPoints: [
                { y: data['blue'][0], label: 'gold' },
                { y: data['blue'][1], label: 'kills' },
                { y: data['blue'][2], label: 'towers' },
                { y: data['blue'][3], label: 'dragons' }
            ]
        },
        {
            type: "stackedBar",
            name: "Red Team",
            showInLegend: "true",
            // xValueFormatString: "DD, MMM",
            // yValueFormatString: "$#,##0",
            dataPoints: [
                { y: data['red'][0], label: 'gold' },
                { y: data['red'][1], label: 'kills' },
                { y: data['red'][2], label: 'towers' },
                { y: data['red'][3], label: 'dragons' }
            ]
        }]
    }

    // const options1 = {
    //     animationEnabled: true,
    //     theme: "dark2",
    //     title:{
    //         text: "Aggregate Gold"
    //     },
    //     toolTip: {
    //         shared: true
    //     },
    //     legend:{
    //         cursor: "pointer"
    //         // itemclick: this.toggleDataSeries
    //     },
    //     data: [{
    //         type: "stackedBar",
    //         name: "Blue Team",
    //         showInLegend: "true",
    //         // xValueFormatString: "Stat, MMM",
    //         // yValueFormatString: "$#,##0",
    //         dataPoints: [
    //             { y: data['blue'][0], x: 0 },
    //         ]
    //     },
    //     {
    //         type: "stackedBar",
    //         name: "Red Team",
    //         showInLegend: "true",
    //         // xValueFormatString: "DD, MMM",
    //         // yValueFormatString: "$#,##0",
    //         dataPoints: [
    //             { y: data['red'][0], x: 0 },
    //         ]
    //     }]
    // }



    // useEffect(() => {
    //     async function loadViews() {

    //         const {CanvasJSChart} = await import('../../assets/canvasjs.react').then(
                
    //             setA("FRICK"),
    //             setA(<CanvasJSChart></CanvasJSChart>)
    //         );
            
    //         console.log('imported canvas shit')
            
    //         console.log('a val : ', a)
    
    //     }
    
    //     loadViews();
    
    // }, [] )

    return (
        // import CanvasJSReact from '../../assets/canvasjs.react.js'; 
        // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
        <div>
			<CanvasJSChart options = {options1} />
			
		</div>
    )

}
export default BarCharts;

// class App extends Component {
// 	constructor() {
// 		super();
// 		this.toggleDataSeries = this.toggleDataSeries.bind(this);
// 	}
// 	toggleDataSeries(e) {
// 		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
// 			e.dataSeries.visible = false;
// 		}
// 		else {
// 			e.dataSeries.visible = true;
// 		}
// 		this.chart.render();
// 	}
// 	render() {
		// const options = {
		// 	animationEnabled: true,
		// 	theme: "light2",
		// 	title:{
		// 		text: "Evening Sales in a Restaurant"
		// 	},
		// 	axisX: {
		// 		valueFormatString: "DDD"
		// 	},
		// 	axisY: {
		// 		prefix: "$"
		// 	},
		// 	toolTip: {
		// 		shared: true
		// 	},
		// 	legend:{
		// 		cursor: "pointer",
		// 		itemclick: this.toggleDataSeries
		// 	},
		// 	data: [{
		// 		type: "stackedBar",
		// 		name: "Meals",
		// 		showInLegend: "true",
		// 		xValueFormatString: "DD, MMM",
		// 		yValueFormatString: "$#,##0",
		// 		dataPoints: [
		// 			{ x: new Date(2018, 5, 25), y: 56 },
		// 			{ x: new Date(2018, 5, 26), y: 45 },
		// 			{ x: new Date(2018, 5, 27), y: 71 },
		// 			{ x: new Date(2018, 5, 28), y: 41 },
		// 			{ x: new Date(2018, 5, 29), y: 60 },
		// 			{ x: new Date(2018, 5, 30), y: 75 },
		// 			{ x: new Date(2018, 6, 1), y: 98 }
		// 		]
		// 	},
		// 	{
		// 		type: "stackedBar",
		// 		name: "Snacks",
		// 		showInLegend: "true",
		// 		xValueFormatString: "DD, MMM",
		// 		yValueFormatString: "$#,##0",
		// 		dataPoints: [
		// 			{ x: new Date(2018, 5, 25), y: 86 },
		// 			{ x: new Date(2018, 5, 26), y: 95 },
		// 			{ x: new Date(2018, 5, 27), y: 71 },
		// 			{ x: new Date(2018, 5, 28), y: 58 },
		// 			{ x: new Date(2018, 5, 29), y: 60 },
		// 			{ x: new Date(2018, 5, 30), y: 65 },
		// 			{ x: new Date(2018, 6, 1), y: 89 }
		// 		]
		// 	},
		// 	{
		// 		type: "stackedBar",
		// 		name: "Drinks",
		// 		showInLegend: "true",
		// 		xValueFormatString: "DD, MMM",
		// 		yValueFormatString: "$#,##0",
		// 		dataPoints: [
		// 			{ x: new Date(2018, 5, 25), y: 48 },
		// 			{ x: new Date(2018, 5, 26), y: 45 },
		// 			{ x: new Date(2018, 5, 27), y: 41 },
		// 			{ x: new Date(2018, 5, 28), y: 55 },
		// 			{ x: new Date(2018, 5, 29), y: 80 },
		// 			{ x: new Date(2018, 5, 30), y: 85 },
		// 			{ x: new Date(2018, 6, 1), y: 83 }
		// 		]
		// 	},
		// 	{
		// 		type: "stackedBar",
		// 		name: "Dessert",
		// 		showInLegend: "true",
		// 		xValueFormatString: "DD, MMM",
		// 		yValueFormatString: "$#,##0",
		// 		dataPoints: [
		// 			{ x: new Date(2018, 5, 25), y: 61 },
		// 			{ x: new Date(2018, 5, 26), y: 55 },
		// 			{ x: new Date(2018, 5, 27), y: 61 },
		// 			{ x: new Date(2018, 5, 28), y: 75 },
		// 			{ x: new Date(2018, 5, 29), y: 80 },
		// 			{ x: new Date(2018, 5, 30), y: 85 },
		// 			{ x: new Date(2018, 6, 1), y: 105 }
		// 		]
		// 	},
		// 	{
		// 		type: "stackedBar",
		// 		name: "Takeaway",
		// 		showInLegend: "true",
		// 		xValueFormatString: "DD, MMM",
		// 		yValueFormatString: "$#,##0",
		// 		dataPoints: [
		// 			{ x: new Date(2018, 5, 25), y: 52 },
		// 			{ x: new Date(2018, 5, 26), y: 55 },
		// 			{ x: new Date(2018, 5, 27), y: 20 },
		// 			{ x: new Date(2018, 5, 28), y: 35 },
		// 			{ x: new Date(2018, 5, 29), y: 30 },
		// 			{ x: new Date(2018, 5, 30), y: 45 },
		// 			{ x: new Date(2018, 6, 1), y: 25 }
		// 		]
		// 	}]
		// }
		// return (
		// <div>
		// 	<CanvasJSChart options = {options}
		// 		onRef={ref => this.chart = ref}
		// 	/>
		// 	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		// </div>
// 		);
// 	}
// }
