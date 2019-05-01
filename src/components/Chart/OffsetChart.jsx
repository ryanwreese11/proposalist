import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

export class OffsetChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usage: props.usage,
      propRatio: props.propRatio,
      systemSize: props.systemSize
    }
  }

  render() {
    const { usage, propRatio, systemSize } = this.props
    let multiply = (num1, num2) => {
      return num1 * num2
    }
    return (
      <div>
        <Bar data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: "Production",
            type: "line",
            borderColor: "rgb(228, 159, 56)",
            data: [
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.056188073)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.059610119)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.084330165)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.095780615)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.107893722)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.108813729)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.108363526)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.10126335)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.089500541)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.080174643)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.05616784)),
              Math.floor(multiply(propRatio, systemSize / 1000 * 0.051913677)),

            ],
            fill: false
          }, {
            label: "Usage",
            type: "bar",
            backgroundColor: "rgb(89, 89, 89)",
            data: [
              Math.floor((usage * 0.056188073)),
              Math.floor((usage * 0.059610119)),
              Math.floor((usage * 0.084330165)),
              Math.floor((usage * 0.095780615)),
              Math.floor((usage * 0.107893722)),
              Math.floor((usage * 0.108813729)),
              Math.floor((usage * 0.108363526)),
              Math.floor((usage * 0.10126335)),
              Math.floor((usage * 0.089500541)),
              Math.floor((usage * 0.080174643)),
              Math.floor((usage * 0.05616784)),
              Math.floor((usage * 0.051913677)),

            ],
          }
          ]
        }
        }
          options={{
            title: {
              display: true,
              text: '',
              fontSize: 25,
              fontColor: '#000'
            },
            legend: {
              display: false,
              position: 'bottom',
              labels: { fontColor: '#000' }
            }, scales: {
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
          }} height={190}/>
      </div>
    )
  }
}

export default OffsetChart
