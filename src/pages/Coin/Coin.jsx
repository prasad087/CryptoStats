import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {


const{coinId} = useParams();
const [coinData, setCoinData] = useState();
const [historicalCoinData, setHistoricalCoinData]=useState();
const {currency} = useContext(CoinContext);

const fetchCoinData= async ()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-2P6rcmbHfARG3cBZDKevQ3wM'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    .then(response => response.json())
    .then(response => setCoinData(response))
    .catch(err => console.error(err));
}

const fetchHistoricalCoinData = async ()=>{

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-2P6rcmbHfARG3cBZDKevQ3wM	'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=365&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalCoinData(response))
      .catch(err => console.error(err));
}

const formatNumber = (num) => {
  if (currency.name === 'inr') {
    return num.toLocaleString('en-IN');
  } else {
    return num.toLocaleString();
  }
};


useEffect(()=>{
  fetchCoinData();
  fetchHistoricalCoinData();
},[currency])


if(coinData && historicalCoinData) {
  return (
    <div className = 'coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalCoinData={historicalCoinData}/>
      </div>


    <div className="coin-info">
      <ul>
      <li>Crypto Price</li>
            <li>{currency.symbol} {formatNumber(coinData.market_data.current_price[currency.name])}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {formatNumber(coinData.market_data.market_cap[currency.name])}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {formatNumber(coinData.market_data.high_24h[currency.name])}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {formatNumber(coinData.market_data.low_24h[currency.name])}</li>
          </ul>
    </div>




    </div>
  )
} 


  else{
    return(
      <div className='spinner'>
          <div className="spin"></div>
      </div>
    )

}
}
export default Coin