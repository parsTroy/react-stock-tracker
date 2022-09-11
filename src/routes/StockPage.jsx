import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { Link, useParams } from "react-router-dom";

const StockPage = () => {
  const [stock, setStock] = useState({})
  const params = useParams()

  //${params.stockId}

  const url = `https://yh-finance.p.rapidapi.com/market/v2/get-quotes`;
  

  useEffect(() => {
    axios.get(url, {
      params: {region: 'US', symbols: params.stockId},
      headers: {
        'X-RapidAPI-Key': 'c78b23ab3emsh9417fe91a36eebap10fb38jsn072f5de820f4',
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
      }
    }).then((response) => {
      setStock(response.data.quoteResponse.result[0])
      // console.log(response.data.quoteResponse.result[0])
    })
  }, [url])
  
  return (
    <div className='rounded-div my-12 py-8'>
      <h1 className="text-4xl">{stock?.shortName}</h1>
      <div className='flex py-8'>
        <div>
          <p className='text-3xl font-bold'>{stock?.symbol}</p>
          <p>({stock.symbol?.toUpperCase()}/ USD)</p>
        </div>
      </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='rounded-div p-4'>
            <div className='flex justify-between'>
              {stock.regularMarketPrice ? (<p className='text-3xl font-bold'>${stock.regularMarketPrice}</p>) : null}
              <p>Regular Market Change</p>
            </div>
            {/* <div>
              <Sparklines data={stock.quoteSummary.earnings.earningsChart?.currentQuarterEstimate}>
                <SparklinesLine color="teal" />
              </Sparklines>
            </div> */}
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>Market Cap</p>
                {stock.marketCap ? (<p>${stock.marketCap.toLocaleString()}</p>) : null}
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Forward PE</p>
                {stock.forwardPE ? (<p>{stock.forwardPE}</p>) : null}
              </div>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>24h High</p>
                {stock.regularMarketDayHigh ? (<p>${stock.regularMarketDayHigh.toLocaleString()}</p>) : null}
              </div>
              <div>
                  <p className='text-gray-500 text-sm'>24h Low</p>
                  {stock.regularMarketDayLow ? (<p>${stock.regularMarketDayLow.toLocaleString()}</p>) : null}
              </div>
              </div>
            </div>

        <div className='rounded-div p-4'>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
          <div>
              <p className='text-gray-500 text-sm'>Dividend Yield</p>
              {stock.dividendYield ? (<p>{stock.dividendYield.toFixed(2)}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Dividend Per Share</p>
              {stock.dividendsPerShare ? (<p>{stock.dividendsPerShare}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Dividend Rate</p>
              {stock.dividendRate ? <p>{stock.dividendRate.toFixed(2)}</p> : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Revenue</p>
              {stock.revenue}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {stock.regularMarketChange ? (<p>{stock.regularMarketChange.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Median T/Price</p>
              {stock.targetPriceMedian ? <p>${stock.targetPriceMedian.toLocaleString()}</p> : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>50 Day Average</p>
              {stock.fiftyDayAverage ? (<p>${stock.fiftyDayAverage.toFixed(2)}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>52 Week High</p>
              {stock.fiftyTwoWeekHigh ? (<p>${stock.fiftyTwoWeekHigh.toFixed(2)}</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>52 Week Low</p>
              {stock.fiftyTwoWeekLow ? (<p>${stock.fiftyTwoWeekLow.toFixed(2)}</p>) : null}
            </div>
          </div>
          <div className='flex justify-around p-8 text-accent'>
              <FaTwitter />
              <FaFacebook />
              <FaReddit />
              <FaGithub />
          </div>
        </div>
        </div>

      {/* Description */}
      <div className='py-4'>
        <p className='text-xl font-bold mt-4'>About {stock.name}</p>
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(stock.description ? stock.description.en : ''),}}></p>
      </div>
    </div>
  );
};

export default StockPage;
