import HTMLReactParser from 'html-react-parser'
import React, { useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import{Col,Row,Typography,Select} from 'antd';

import { 
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptohistoryQuery } from '../services/cryptoApi'; 
import LineChart from './LineChart';
import Loader from './Loader';

  const {Title,Text}=Typography;
  const {Option}=Select;

const CryptoDetails = () => {
  const {coinId}=useParams();
  const [timePeriod,setTimePeriod]=useState('24h');

  const {data,isFetching}=useGetCryptoDetailsQuery(coinId);
  
  const {data:coinHistory}=useGetCryptohistoryQuery({coinId,timePeriod});
  const cryptoDetails = data?.data?.coin;

  
  if(isFetching ) return <Loader/>;

  
  const time = ['3h', '24h', '7d', '30d','3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <div>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </Title>
          <p>
            {cryptoDetails?.symbol} live price in Us dollars.
            view value statistics, market cap and supply
          </p>
        </Col>
        <Select 
          defaultValue="24h" 
          className='select-timeperiod' 
          placeholder="Select Time Period " 
          
          onChange={(value)=> setTimePeriod(value)}>

            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
        </Select>
        
        <LineChart 
          coinHistory={coinHistory} 
          currentPrice={millify(cryptoDetails?.price)} 
          coinName={cryptoDetails?.name}
          timePeriod={timePeriod}
          />

        <Col className='stats-container'>
          <Col className='coin-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-deatiles-heading'>
                  {cryptoDetails?.name}Value Statistics
                </Title>
                <p>An overview showing the stats of {cryptoDetails?.name}</p>
              </Col>
              {stats.map(({icon,title,value})=>(
                <Col className='coin-stats' key={title}>
                  <Col className='coin-stats-name'>
                      {icon}
                      <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col> 
              ))}
          </Col>
          <Col className='other-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-deatiles-heading'>
                  Other Statistics
                </Title>
                <p>An overview showing the stats of all cryptos</p>
              </Col>
              {genericStats.map(({icon,title,value})=>(
                <Col className='coin-stats' key={title}>
                  <Col className='coin-stats-name'>
                      {icon}
                      <Text>{title}</Text>
                  </Col>
                  <Text classname="stats">{value}</Text>
                </Col> 
              ))}
          </Col>
        </Col>
        <Col className='coin-desc-link'>
              <Row className='coin-desc'>
                <Title level={2} className='coin-details-heading'>
                  What is {cryptoDetails?.name}? <br />
                  <div className='coin-description'>
                    {typeof cryptoDetails?.description === 'string' ? HTMLReactParser(cryptoDetails?.description) : null}
                  </div>
                </Title>
                
              </Row>
              <Col className='coin-links'>
                <Title level={2} className='coin-details-heading'>
                  {cryptoDetails?.name} Links
                </Title>
                {cryptoDetails?.links?.filter(link => link).map((link)=>(
                  <Row className='coin-link' key={link.name}>
                    <Title level={5} className='link-name'>
                      {link.type}
                    </Title>
                    <a href={link.url} target='_blank' rel='noreferrer'>
                      {link.name}
                    </a>
                  </Row>
                ))}

              </Col>
        </Col>

      </Col>
    </div>
  )
}

export default CryptoDetails