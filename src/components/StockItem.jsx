import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
// import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const StockItem = ({stock}) => {

    const [savedStock, setSavedStock] = useState(false);
    const { user } = UserAuth();

    const stockPath = doc(db, 'users', `${user?.email}`);

    const saveStock = async () => {
        if (user?.email) {
            setSavedStock(true);
            await updateDoc(stockPath, {
                watchList: arrayUnion({
                    id: stock.ticker,
                    name: stock.company_name,
                    exchange: stock.exchange,
                    price: stock.price,
                    dividend: stock.dividend_yield,
                    sector: stock.sector
                })
            })
        } else {
            alert('Please sign in to save a coin to your watchlist!')
        }
    };

  return (
    <tr className='h-[80px] border-b overflow-hidden'>
        <td onClick={saveStock}>{savedStock ? <AiFillStar />: <AiOutlineStar />}</td>
        <td>{stock.ticker}</td>
        <td>
            <Link to={`/stock/${stock.ticker}`}>
                <div className='flex items-center'>
                    <p className='hidden sm:table-cell'>{stock.company_name}</p>
                </div>
            </Link>
        </td>
        <td>${stock.price.toLocaleString()}</td>
        <td></td>
        <td>
            {stock.price > 0 ? (
                <p className='text-green-600'>{stock.change.toFixed(2)}</p>
            ) : (
                <p className='text-red-600'>{stock.change.toFixed(2)}</p>
            )}
        </td>
        <td className='w-[180px] hidden md:table-cell'>{stock.dividend_yield}</td>
        <td className='w-[180px] hidden sm:table-cell'>{stock.sector}</td>
        <td>{stock.exchange}</td>
        <td className='w-[180px] hidden sm:table-cell'>{stock.roi}</td>
    </tr>
    );
};

export default StockItem;
