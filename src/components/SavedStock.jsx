import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const SavedStock = () => {
  const [stocks, setStocks] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setStocks(doc.data()?.watchList);
    });
  }, [user?.email]);

  const stockPath = doc(db, 'users', `${user?.email}`);
  const deleteCoin = async (passedid) => {
    try {
      const result = stocks.filter((item) => item.id !== passedid);
      await updateDoc(stockPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {stocks?.length === 0 ? (
        <p>
          You don't have any stocks saved. Please save a stock to add it to your
          watch list. <Link to='/'>Click here to search stocks.</Link>
        </p>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Stock</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map((stock) => (
              <tr key={stock.id} className='h-[60px] overflow-hidden'>
                <td>{stock?.rank}</td>
                <td>
                  <Link to={`/coin/${stock.id}`}>
                    <div className='flex items-center'>
                      <img src={stock?.image} className='w-8 mr-4' alt='/' />
                      <div>
                        <p className='hidden sm:table-cell'>{stock?.name}</p>
                        <p className='text-gray-500 text-left text-sm'>
                          {stock?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>
                  <AiOutlineClose
                    onClick={() => deleteCoin(stock.id)}
                    className='cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedStock;
