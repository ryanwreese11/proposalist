import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {

      usage: props.usage,
      production: props.production,
      systemSize: props.systemSize,
      propRation: props.propRatio
    }
  }

      

  render() {
    let diff = (num1, num2) =>{
        return num1 - num2
      }
  
    return (
      <div className="chart">
     
        
          <Doughnut
          data={{labels: ['Solar', 'Utility'],
          datasets:[
            {
              label:'Expenses by Month',
              data:[
                 
                  diff(Math.floor(this.props.propRatio * this.props.systemSize / 1000)), this.props.usage
              ],
              backgroundColor:[
                'rgb(228, 159, 56)',
                'rgb(89, 89, 89)',

              ]
            }
          ]
        }}
        options={{
          title:{
            display:true,
            text:'Usage Offset',
            fontSize:25,
            fontColor: '#000'
          },
          legend:{
            display:true,
            position:'bottom',
            labels: {fontColor: '#000'}
          }
        }}
          
        />
      </div>
    )
  }
}

export default Chart;