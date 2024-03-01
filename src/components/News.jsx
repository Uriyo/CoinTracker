import React, { useState } from 'react'
import {Select,Typography,Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';
const { Text, Title, Paragraph }  = Typography;
const {Option} =Select;

const demoImage='https://www.nasdaq.com/sites/acquia.prod/files/styles/720x400/public/2022/12/07/cryptocurrency-Nuthawut-adobe.jpeg?h=34bbd072&itok=NNYETVd0';

const News = ({simplified}) => {
  const {data:cryptoNews}=useGetCryptoNewsQuery({count:simplified? 6 : 12})
  // const [newsCategory,setNewsCategory]=useState('')

  console.log(cryptoNews);
  if (!cryptoNews?.data) return <Loader/>;
  return (
    <div>
        <Row gutter={[24,24]}>
          {cryptoNews?.data?.map((news,i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card hoverable className='news-card'>
                    <a href={news.url} target='_blank' rel='noreferrer'>
                    <div className='news-image-container'>
                      <Title className='news-title' level={4}>{news.title}</Title>
                      <img 
                      src={news?.thumbnail || demoImage} 
                      alt='thumbnail' className='news-image'
                      style={{maxWidth:'200px',maxHeight:'100px'}}
                      ></img>
                    </div>
                    <p>
                        {news?.description.length > 100 ?
                         `${news.description.substring(0,100)}`
                         : news.description}
                    </p>
                    <div className='provider-container'>
                          <div>
                            {/* <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""></Avatar> */}
                            
                            <Text>{moment(news.createdAt, 'ddd, DD MMM YYYY HH:mm:ss Z').startOf('ss').fromNow()}</Text>
                          </div>
                    </div>
                    </a>
                  </Card>
                </Col>
            ))}

        </Row>
    </div>
  )
}

export default News