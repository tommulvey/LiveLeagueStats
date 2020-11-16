import React, { Component } from 'react'
import Charty from 'react-charty'

const MINIMAL_EXAMPLE_DATA = {
    type: 'line',
    data: {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      y0: [49.93, 49.61, 49.15, 49.11, 47.88, 50.03,46.11, 52.24, 52.49, 
        53.13, 63.59, 36.07, 29.98, 35.53, 34.19, 31.63, 33.19, 52.53, 50.11, 
        27.76, 21.26, 21.79, 7.51, 2.59, 0.34]
    },
    colors: {
      y0: '#03DAC6'
    },
    names: {
      y0: 'win %, (blue)'
    },
    startX: 1,
    endX: 15,
    minY: 0,
    maxY: 100,
    xAxisStep: 2,
    showPreview: false,
    showRangeText: false,
    showLegendTitle: false
  };

export class Data extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <Charty {...MINIMAL_EXAMPLE_DATA} />
    )
  }
}

export default Data