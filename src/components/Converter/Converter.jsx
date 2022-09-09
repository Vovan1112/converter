import { React, useState, useEffect, useCallback, memo } from 'react';
import Block from '../Block/Block'

const Converter = () => {
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
            }).catch(err => {
                console.warn(err)
                alert('Error')
            })
    }, [])

    const onChangePrice = useCallback((isDirect, value) => {
        const price = value / rates[isDirect ? toCurrency : fromCurrency];
        const result = price * rates[isDirect ? fromCurrency : toCurrency];
        setToPrice(isDirect ? value : result)
        setFromPrice(isDirect ? result : value);
    }, [rates, fromCurrency, toCurrency])


    useEffect(() => {
        onChangePrice(false, fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        onChangePrice(true, toPrice)
    }, [toCurrency])

    return (
        <>
            <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangePrice.bind(undefined, false)} />
            <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangePrice.bind(undefined, true)} />
        </>
    )
}

export default memo(Converter);
