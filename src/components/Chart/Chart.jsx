import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {

      usage: props.usage,
      production: props.production
    }
  }

      

  render() {
    let diff = (num1, num2) =>{
        return num1 - num2
      }
      const data = {
      labels: ['Solar', 'Utility'],
      datasets: [
        {
          label: 'Usage Offset',
          data: [this.props.production, diff(this.props.usage,this.props.production)],
          fill: false,          // Don't fill area under the line
          backgroundColor: ['darkgreen', ' grey'],
          border: 'none'  // Line color
        }
      ]
    }
    return (
      <div className="chart">
     
        <Doughnut
          data={data}
        />
      </div>
    )
  }
}

export default Chart;