import React from 'react';
import { Col, Row, Typography } from 'antd';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement, 
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName,timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length; i > 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i]?.price);
  }

  for (let i = coinHistory?.data?.history?.length; i >0 ; i -= 1) {
    
    const timestamp = new Date(coinHistory?.data?.history[i]?.timestamp * 1000);
    if (['3h', '24h'].includes(timePeriod)) {
      coinTimestamp.push(timestamp.toLocaleTimeString());
    } else {
      coinTimestamp.push(timestamp.toLocaleDateString());
    }
  }
  
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        pointBorderColor:'aqua',
      },
    ],
  };

  const options = {
    plugins:{
        legend:{
            display:true,
        },
    },
    scales: {
      
        x: {
            title: {
              display: true,
              text: 'Date', // Replace with your desired label for the x-axis
            },
          },

        y: [
        {
          ticks: {
            beginAtZero: true,
          },
          title:{
            display:true,
            text:'price'
          }
        },
    ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;