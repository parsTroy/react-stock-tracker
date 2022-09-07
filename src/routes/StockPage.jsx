import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";

const StockPage = () => {
  const [stock, setStock] = useState({})
  const params = useParams()

  const url = `https://api.coingecko.com/api/v3/coins/${params.stockId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setStock(response.data)
      console.log(response.data)
    })
  }, [url])
  
  return (
    <div className='rounded-div my-12 py-8'>
      <div className='flex py-8'>
        <img className='w-20 h-20 mr-8' src={stock.image?.large} alt="/" />
        <div>
          <p className='text-3xl font-bold'>{stock?.name} price</p>
          <p>({stock.symbol?.toUpperCase()} / CAD)</p>
        </div>
      </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <div className='flex justify-between'>
              {stock.market_data?.current_price ? (<p className='text-3xl font-bold'>${stock.market_data.current_price.cad.toLocaleString()}</p>) : null}
              <p>7 Day</p>
            </div>
            <div>
              <Sparklines data={stock.market_data?.sparkline_7d.price}>
                <SparklinesLine color="teal" />
              </Sparklines>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>Market Cap</p>
                {stock.market_data?.market_cap ? (<p>${stock.market_data.market_cap.cad.toLocaleString()}</p>) : null}
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Volume (24h)</p>
                {stock.market_data?.market_cap ? (<p>${stock.market_data.total_volume.cad.toLocaleString()}</p>) : null}
              </div>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'>24h High</p>
                {stock.market_data?.high_24h ? (<p>${stock.market_data.high_24h.cad.toLocaleString()}</p>) : null}
              </div>
              <div>
                  <p className='text-gray-500 text-sm'>24h Low</p>
                  {stock.market_data?.low_24h ? (<p>${stock.market_data.low_24h.cad.toLocaleString()}</p>) : null}
              </div>
              </div>
            </div>

        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Rank</p>
              {stock.market_cap_rank}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              {stock.hashing_algorithm ? <p>{stock.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {stock.tickers ? <p>{stock.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_24h.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_7d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_14d.toFixed(2)}%</p>) : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_30d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_60d.toFixed(2)}%</p>) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              {stock.market_data ? (<p>{stock.market_data.price_change_percentage_1y.toFixed(2)}%</p>) : null}
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
