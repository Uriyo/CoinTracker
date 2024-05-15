import React, { useEffect } from 'react';
import {Routes,Route,Link, useLocation} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { initGA, logPageView } from './ga';
import {
    Navbar,
    Homepage,
    Exchanges,
    CryptoCurrencies,
    CryptoDetails,
    News 
    } from './components/index';

import './App.css';
import 'antd/dist/reset.css';

const App = () => {
    const location = useLocation();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);
  return (
    <div>
        <div className='app'>
            <div className='navbar'>
                <Navbar />  
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route path='/' element={<Homepage/>} >
                            </Route>
                            <Route exact path='/exchanges' element={<Exchanges/>}>
                            </Route>
                            <Route exact path='/cryptocurrencies' element={<CryptoCurrencies/>}>
                            </Route>
                            <Route exact path='/crypto/:coinId' element={<CryptoDetails/>}>
                            </Route>
                            <Route exact path='/news' element={<News/>}>
                            </Route>
                        </Routes>
                    </div>
                </Layout>
            
                <div className='footer' level={5} style={{color:'white',textAlign:'center'}}>
                <Typography.Title>
                    CoinTracker <br />
                    All Rights Reserved
                </Typography.Title>
                <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/exchanges'>Exchanges</Link>
                    <Link to='/news'>News</Link>
                </Space>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App