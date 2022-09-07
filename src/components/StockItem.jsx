import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Sparklines, SparklinesLine } from 'react-sparklines';
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
                    id: stock.id,
                    name: stock.name,
                    image: stock.image,
                    rank: stock.market_cap_rank,
                    symbol: stock.symbol
                })
            })
        } else {
            alert('Please sign in to save a coin to your watchlist!')
        }
    };

  return (
    <tr className='h-[80px] border-b overflow-hidden'>
        <td onClick={saveStock}>{savedStock ? <AiFillStar />: <AiOutlineStar />}</td>
        <td>{stock.market_cap_rank}</td>
        <td>
            <Link to={`/stock/${stock.id}`}>
                <div className='flex items-center'>
                    <img className='w-6 mr-2 rounded-full' src={stock.image} alt={stock.id} />
                    <p className='hidden sm:table-cell'>{stock.name}</p>
                </div>
            </Link>
        </td>
        <td>{stock.symbol.toUpperCase()}</td>
        <td>${stock.current_price.toLocaleString()}</td>
        <td>
            {stock.price_change_percentage_24h > 0 ? (
                <p className='text-green-600'>{stock.price_change_percentage_24h.toFixed(2)}%</p>
            ) : (
                <p className='text-red-600'>{stock.price_change_percentage_24h.toFixed(2)}%</p>
            )}
        </td>
        <td className='w-[180px] hidden md:table-cell'>${stock.total_volume.toLocaleString()}</td>
        <td className='w-[180px] hidden sm:table-cell'>${stock.market_cap.toLocaleString()}</td>
        <td>
            <Sparklines data={stock.sparkline_in_7d.price}>
                <SparklinesLine color='teal' />
            </Sparklines>
        </td>
    </tr>
    );
};

export default StockItem;