import React, { useState } from 'react';

const PercentageCalculator = () => {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [percentage, setPercentage] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);

  // Calculate percentage of Value A from Value B
  const calculatePercentageOf = (e) => {
    e.preventDefault();
    if (valueA && valueB) {
      const percentageOf = (parseFloat(valueA) / parseFloat(valueB)) * 100;
      setResult1(percentageOf.toFixed(2));
    }
  };

  // Calculate what X% of Value B is
  const calculateValueFromPercentage = (e) => {
    e.preventDefault();
    if (percentage && valueB) {
      const valueFromPercentage = (parseFloat(percentage) / 100) * parseFloat(valueB);
      setResult2(valueFromPercentage.toFixed(2));
    }
  };

  
  const calculatePercentageChange = (e) => {
    e.preventDefault();
    if (initialValue && finalValue) {
      const change = ((parseFloat(finalValue) - parseFloat(initialValue)) / parseFloat(initialValue)) * 100;
      setResult3(change.toFixed(2));
    }
  };

  return (
    
      <div className="bg-white/30 blur(8px) m-auto mt-[95px] p-6 rounded-xl shadow-2xl mb-12 w-[60%]">
        <h1 className="text-xl font-bold mb-4 text-center">Percentage Calculator</h1>

        {/* Form 1: Calculate percentage of Value A from Value B */}
        <form onSubmit={calculatePercentageOf} className="mt-12 ml-[80px] flex space-x-4">
          <div>
            <label className="block font-medium mb-1">What is:</label>
            <input
              type="number"
              value={valueA}
              onChange={(e) => setValueA(e.target.value)}
              placeholder="Enter first value"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">% of (Total):</label>
            <input
              type="number"
              value={valueB}
              onChange={(e) => setValueB(e.target.value)}
              placeholder="Enter total value"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
  type="submit"
  className="w-40 bg-blue-500 text-white mt-[28px] ml-4 rounded-lg hover:bg-blue-600 transition-colors"
>
  Calculate
</button>
        </form>

        {result1 !== null && (
          <div className="mt-4 p-2 text-center bg-gray-100 rounded-lg">
            <p>{valueA} is {result1}% of {valueB}.</p>
          </div>
        )}

        {/* Form 2: Calculate X% of Value B */}
        <form onSubmit={calculateValueFromPercentage} className=" mt-10 ml-[80px] flex space-x-4 mt-6">
          <div>
            <label className="block font-medium mb-1">Is what percent of (%):</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Value B (Total):</label>
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="Enter total value"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
  type="submit"
  className="w-40 bg-green-500 text-white mt-[28px] ml-4 rounded-lg hover:bg-green-600 transition-colors"
>
  Calculate
</button>
        </form>

        {result2 !== null && (
          <div className="mt-4 p-2 text-center bg-gray-100 rounded-lg">
            <p>{percentage}% of {valueB} is {result2}.</p>
          </div>
        )}

        {/* Form 3: Calculate Percentage Increase/Decrease */}
        <form onSubmit={calculatePercentageChange} className="mt-12 flex ml-[80px] space-x-4 mt-6">
          <div>
            <label className="block font-medium mb-1">% increase\Decrease:</label>
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="Enter initial value"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Final Value:</label>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              placeholder="Enter final value"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
  type="submit"
  className="w-40 bg-purple-500 text-white mt-[28px] ml-2 rounded-lg hover:bg-purple-600 transition-colors"
>
  Calculate
</button>
        </form>

        {result3 !== null && (
          <div className="mt-4 p-2 text-center bg-gray-100 rounded-lg">
            <p>The percentage change from {initialValue} to {finalValue} is {result3}%.</p>
          </div>
        )}
      </div>
    
  );
};

export default PercentageCalculator;
