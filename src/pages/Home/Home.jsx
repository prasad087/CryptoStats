import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Home = () => {

const {allCoin, currency}=useContext(CoinContext);
const [displayCoin, setDisplayCoin]=useState([]);
const [input,setInput]=useState('');

const inputHandler=(event)=>{
    setInput(event.target.value);
    if(event.target.value === "")
      setDisplayCoin(allCoin)
}
const searchHandler =async (event)=>{
    event.preventDefault();
   const coins =  await allCoin.filter((item)=>{
       return item.name.toLowerCase().includes(input.toLowerCase())
    })
  setDisplayCoin(coins);
}
const formatNumber = (num) => {
  if (currency.name === 'inr') {
    return num.toLocaleString('en-IN');
  } else {
    return num.toLocaleString();
  }
};



useEffect(()=>{
  setDisplayCoin(allCoin);
},[allCoin])



  return (
    <div className='home'>
      <div className="hero">
        <h1>CryptoStats <br/>by Prasad Gomkale</h1>
        <p>Welcome to CryptoStats!!!<br/> CryptoStats provides you with the latest updates, historical data, and insightful charts for all your favorite coins. Explore the dynamic world of digital currencies with confidence and make informed decisions backed by comprehensive data.</p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type='text' placeholder='Search Crypto..' required/>

          <datalist id='coinlist'>
            {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>
          
          <button type='submit'>Search</button>
        </form> 

      </div>
       <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}> 24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
  <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
    <p>{item.market_cap_rank}</p>
    <div>
      <img src={item.image} alt="" />
      <p>{item.name + " - " + item.symbol}</p>
    </div>
    <p>{currency.symbol} {formatNumber(item.current_price)}</p>
    <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
      {Math.floor(item.price_change_percentage_24h * 100) / 100}%
    </p>
    <p className="market-cap">{currency.symbol} {formatNumber(item.market_cap)}</p>
  </Link>
  
))}

        </div>        
    </div>
  )
}

export default Home