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

  // const url = 'https://financialmodelingprep.com/api/v3/stock/list?apikey=0b92bda5d2f297a72d359be292be3991'

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setStocks(response.data)
  //     console.log(response.data);
  //   })
  // },[url])

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