import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Account from './routes/Account';
import axios from 'axios'
import StockPage from './routes/StockPage';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {

  const [stocks, setStocks] = useState([])

  const url = 'https://finviz2.p.rapidapi.com/api/v1/screener'

  useEffect(() => {
    axios.get(url, {
      params: {
        limit: '10',
        page: '1',
        exchange: 'true',
        sector: 'true',
        industry: 'true',
        country: 'true',
        index: 'true',
        market_capitalization: 'n,n,true',
        income: 'n,n,true',
        sales: 'n,n,true',
        cps: 'n,n,true',
        dividend: 'n,n,true',
        dividend_yield: 'n,n,true',
        recom: 'n,n,true',
        pe: 'n,n,true',
        current_ratio: 'n,n,true',
        debt_equity: 'n,n,true',
        eps_ttm: 'n,n,true',
        eps_next_year: 'n,n,true',
        eps_next_quarter: 'n,n,true',
        eps_this_year_growth: 'n,n,true',
        eps_next_year_growth: 'n,n,true',
        eps_next_5_year_growth: 'n,n,true',
        eps_past_5_year: 'n,n,true',
        insider_own: 'n,n,true',
        insider_trans: 'n,n,true',
        roi: 'n,n,true',
        shares_outstanding: 'n,n,true',
        target_price: 'n,n,true',
        range_52W_high: 'n,n,true',
        range_52W_low: 'n,n,true',
        volume: 'n,n,true',
        beta: 'n,n,true',
        price: 'n,n,true',
        change: 'n,n,true'
      },
      headers: {
        'X-RapidAPI-Key': 'c78b23ab3emsh9417fe91a36eebap10fb38jsn072f5de820f4',
        'X-RapidAPI-Host': 'finviz2.p.rapidapi.com'
      }
    }).then((response) => {
      // console.log(response.data);
      setStocks(response.data);
    })
  }, [url])

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home stocks={stocks} />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/stock/:stockId' element={<StockPage />} />
          <Route path=':stockId' />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;