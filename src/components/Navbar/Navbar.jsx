import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const{setCurrency}=useContext(CoinContext)
  const currencyHandler = (event)=>{
      switch (event.target.value){
        case "usd":{
          setCurrency({name: "usd", Symbol:"$"});
          break;
        }
        case "inr":{
          setCurrency({name: "inr", Symbol:"₹"});
          break;
        }
        default: {
          setCurrency({name: "usd", Symbol:"$"});
          break;
        }
        
      }
  }
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="" className='logo'/>
        </Link>
        <ul>
        <Link to={'/'}><li>Home</li></Link>
                      
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                
            </select>
           
        </div>
    </div>  
  )
}

export default Navbar
