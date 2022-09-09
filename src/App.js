import {React, useState, useEffect} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH') 
  const [toCurrency, setToCurrency] = useState('USD')
  const [rates, setRates] = useState({})
  const [fromPrice, setFromPrice] = useState()
  const [toPrice, setToPrice] = useState()
 
  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates)
      console.log(json.rates)
    }).catch(err => {
      console.warn(err)
      alert('Error')
    })
   }, [])
  
 
 
 const onChangeFromPrice = (value) => {
  const price = value / rates[fromCurrency];
  const result = price * rates[toCurrency];
  setFromPrice(value)
  setToPrice(result);
 }

 const onChangeToPrice = (value) => {
  const price = value / rates[toCurrency];
  const result = price * rates[fromCurrency];
  setToPrice(value)
  setFromPrice(result);
 }


 useEffect(() => {
 onChangeFromPrice(fromPrice)
 }, [fromCurrency])

 useEffect(() => {
  onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
