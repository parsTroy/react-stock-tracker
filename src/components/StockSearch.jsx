import React, { useState } from "react";
import StockItem from "./StockItem";

const StockSearch = ({stocks}) => {
    const [searchText, setSearchText] = useState('')

    console.log(stocks);

    return (
        <div className='rounded-div my-4'>
            <div className='flex flex-col md:flex-row justify-between pt-4 pb-6text-center md:text-right'>
                <h1 className='text-2xl font-bold my-2'>Search Stock</h1>
                <form>
                    <input onChange={(e) => setSearchText(e.target.value)} className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl' type='text' placeholder='Search a Stock' />
                </form>
            </div>

            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th></th>
                        <th className='px-4'>Ticker</th>
                        <th className='text-left'>Company</th>
                        <th>Price</th>
                        <th className='w-8'></th>
                        <th className='hidden md:table-cell'>Change</th>
                        <th>Dividend Yield</th>
                        <th>Sector</th>
                        <th>Exchange</th>
                        <th>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.filter((value) => {
                        if (searchText === '') {
                            return value
                        } else if (
                            results.ticker.includes(searchText)
                        ) {
                            return value
                        }
                    }).map((stock) => (
                        <StockItem key={stock.ticker} stock={stock} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockSearch;
