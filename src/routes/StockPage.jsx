import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";

const StockPage = () => {
  const [stock, setStock] = useState({})
  const params = useParams()

  //${params.coinId}

  const url = `https://api.polygon.io/v2/aggs/ticker/${params.stockId}/prev?adjusted=true&apiKey=vixQjL6qlMgy72k0XrFAtGp62c_4681S`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setStock(response.data)
      console.log(response.data)
    })
  }, [url])
  
  return (
    <div className='rounded-div my-12 py-8'>
      <div className='flex py-8'>
        {/* <img className='w-20 h-20 mr-8' src={stock.image?.large} alt="/" /> */}
        <div>
          <p className='text-3xl font-bold'>{stock?.ticker} price</p>
          {/* <p>({stock.ticker?.toUpperCase()} / CAD)</p> */}
        </div>
      </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <div className='flex justify-between'>
              {stock.results[0].c ? (<p className='text-3xl font-bold'>${stock.results[0].c.toLocaleString()}</p>) : null}
              <p>7 Day</p>
            </div>
            <div>
              {/* <Sparklines data={stock.market_data?.sparkline_7d.price}>
                <SparklinesLine color="teal" />
              </Sparklines> */}
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>Market Cap</p>
                {stock.price?.price ? (<p>${stock.price.cad.toLocaleString()}</p>) : null}
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Volume (24h)</p>
                {stock.results[0].v ? (<p>{stock.results[0].v}</p>) : null}
              </div>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>24h High</p>
                {stock.results[0].o ? (<p>${stock.results[0].o.toLocaleString()}</p>) : null}
              </div>
              <div>
                  <p className='text-gray-500 text-sm'>24h Low</p>
                  {stock.results[0].vw ? (<p>${stock.results[0].vw.toLocaleString()}</p>) : null}
              </div>
              </div>
            </div>

        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Rank</p>
              {stock.price}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              {stock.price ? <p>{stock.price}</p> : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {stock.tickers ? <p>{stock.price.toFixed(2)}</p> : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              {stock.price ? (<p>{stock.price.toFixed(2)}%</p>) : null}
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
        <p className='text-xl font-bold'>About {stock.name}</p>
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(stock.description ? stock.description.en : ''),}}></p>
      </div>
    </div>
  );
};

export default StockPage;
