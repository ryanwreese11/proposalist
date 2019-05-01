import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

export class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usage: props.usage,
      utilityRate: props.utilityRate
    }
  }
  render() {
const {usage, utilityRate} = this.props
let multiply = (num1, num2) => {
  return num1* num2
}
    return (
      <div>
        <Bar
          data={{labels: ['Today', '5 years', '10 years', '15 years', '20 years', '25 years'],
          datasets:[
            {
              label:'Expected annual bill $',
              data:[
                  Math.floor(multiply(usage, utilityRate)),
                  Math.floor(multiply(usage, utilityRate)* 1.2) ,
                  Math.floor(multiply(usage, utilityRate) * 1.4) ,
                  Math.floor(multiply(usage, utilityRate) * 1.6),
                  Math.floor(multiply(usage, utilityRate) * 1.8 ),
                  Math.floor(multiply(usage, utilityRate) * 2) 
                 
                  
                  
              ],
              backgroundColor:[
                
                'rgb(89, 89, 89)',
                'rgb(89, 89, 89)',
                'rgb(89, 89, 89)',
                'rgb(89, 89, 89)',
                'rgb(89, 89, 89)',
                'rgb(89, 89, 89)',

              ]
            }
          ]
        }}
        options={{
          title:{
            display:true,
            text:'',
            fontSize:25,
            fontColor: '#000'
          },
          legend:{
            display:false,
            position:'bottom',
            labels: {fontColor: '#000'}
          },scales: {
            xAxes: [{
              ticks: {
                display: false
              },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }   
            }]
        }
        }}
          
        />
      </div>
    )
  }
}

export default BarChart
