import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const LineGraph = (props) =>{
  return (
    <div style={{
      width: '600px',
      height: '600px',
      margin: '50px auto',
    }}>
      <Line data={{
        labels: props.label.map(l => l.substr(0,10)),
        
        datasets: [
          {
            label: 'Covid',
            fill: false,
            lineTension: 0.1,
            borderWidth: 4,
            backgroundColor: 'rgba(75, 192, 192,0.4)',
            borderColor: 'green',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            // y-axis data plotting values
            data: props.yAxis.map(l => l),
          }
        ]
      }}/>
    </div>
  )
}
export default LineGraph
