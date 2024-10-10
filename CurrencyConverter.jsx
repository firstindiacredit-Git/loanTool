import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const currencyNames = {
  USD: 'United States Dollar',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  // Add more currency names here
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [allRates, setAllRates] = useState({});
  
  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setCurrencies([res.data.base, ...Object.keys(res.data.rates)]);
        setAllRates(res.data.rates);  // Save all rates for table and chart
        setExchangeRate(res.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching currencies: ", error);
      }
    };
    getCurrencies();
  }, [toCurrency]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        setExchangeRate(res.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate: ", error);
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  // Prepare data for chart
  const chartData = {
    labels: Object.keys(allRates),
    datasets: [
      {
        label: `1 ${fromCurrency} in other currencies`,
        data: Object.values(allRates),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Currency Converter</h2>

      <div className="converter-form space-y-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex space-x-4">
          <select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency} - {currencyNames[currency] || 'Unknown Currency'}
              </option>
            ))}
          </select>

          <span className="flex items-center text-gray-500">to</span>

          <select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency} - {currencyNames[currency] || 'Unknown Currency'}
              </option>
            ))}
          </select>
        </div>

        {exchangeRate && (
          <p className="text-center text-lg font-medium text-gray-700">
            {amount} {currencyNames[fromCurrency] || fromCurrency} = <span className="font-bold text-blue-600">{convertedAmount} {currencyNames[toCurrency] || toCurrency}</span>
          </p>
        )}

        {/* Chart Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Currency Comparison Chart</h3>
          <Bar data={chartData} />
        </div>

        {/* Table Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">All Exchange Rates</h3>
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Currency</th>
                <th className="border-b px-4 py-2">Full Name</th>
                <th className="border-b px-4 py-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allRates).map(([currency, rate]) => (
                <tr key={currency}>
                  <td className="border-b px-4 py-2">{currency}</td>
                  <td className="border-b px-4 py-2">{currencyNames[currency] || 'Unknown Currency'}</td>
                  <td className="border-b px-4 py-2">{rate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
