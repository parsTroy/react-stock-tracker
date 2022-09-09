import React from "react";
import StockSearch from "../components/StockSearch";
// import Trending from "../components/Trending";

const Home = ({ stocks }) => {
  return (
    <div>
      <StockSearch stocks={stocks} />
      {/* <Trending /> */}
    </div>
  );
};

export default Home;
