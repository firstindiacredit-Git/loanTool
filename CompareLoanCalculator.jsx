import React, { useState } from "react";

const CompareLoanCalculator = () => {
    const [loan1, setLoan1] = useState({ principal: '', interest: '', tenure: '' });
    const [loan2, setLoan2] = useState({ principal: '', interest: '', tenure: '' });
    const [results, setResults] = useState({ emi1: 0, emi2: 0, totalInterest1: 0, totalInterest2: 0, totalPayment1: 0, totalPayment2: 0 });
    const [showComparePopup, setShowComparePopup] = useState(true); // Add a state to control popup visibility

    const calculateEMI = (P, R, N) => {
        const monthlyRate = R / 12 / 100;
        return (P * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1);
    };

    const handleCompare = () => {
        const emi1 = calculateEMI(parseFloat(loan1.principal), parseFloat(loan1.interest), parseInt(loan1.tenure));
        const emi2 = calculateEMI(parseFloat(loan2.principal), parseFloat(loan2.interest), parseInt(loan2.tenure));
        const totalPayment1 = emi1 * parseInt(loan1.tenure);
        const totalPayment2 = emi2 * parseInt(loan2.tenure);
        const totalInterest1 = totalPayment1 - parseFloat(loan1.principal);
        const totalInterest2 = totalPayment2 - parseFloat(loan2.principal);

        setResults({ emi1, emi2, totalInterest1, totalInterest2, totalPayment1, totalPayment2 });
    };

    const handleClear = () => {
        setLoan1({ principal: '', interest: '', tenure: '' });
        setLoan2({ principal: '', interest: '', tenure: '' });
        setResults({ emi1: 0, emi2: 0, totalInterest1: 0, totalInterest2: 0, totalPayment1: 0, totalPayment2: 0 });
    };

    const closeComparePopup = () => {
        setShowComparePopup(false);
    };

    return (
        <>
            {showComparePopup && (
                <div className="h-[50vh] bg-white rounded-md  mb-7 md:p-6">
                    <div className="max-w-md mx-auto bg-white -mt-[15px] text-black md:p-4  rounded-lg">
                        <h2 className="text-center text-xl md:text-2xl font-bold mb-[11px] md:mb-4">Compare Loan</h2>

                        <div className="grid grid-cols-2 gap-2 mb-1 md:mb-6">
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 1 Principal</label>
                                <input
                                    type="number"
                                    value={loan1.principal}
                                    onChange={(e) => setLoan1({ ...loan1, principal: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 2 Principal</label>
                                <input
                                    type="number"
                                    value={loan2.principal}
                                    onChange={(e) => setLoan2({ ...loan2, principal: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 1 Interest (%)</label>
                                <input
                                    type="number"
                                    value={loan1.interest}
                                    onChange={(e) => setLoan1({ ...loan1, interest: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 2 Interest (%)</label>
                                <input
                                    type="number"
                                    value={loan2.interest}
                                    onChange={(e) => setLoan2({ ...loan2, interest: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 1 Tenure (Months)</label>
                                <input
                                    type="number"
                                    value={loan1.tenure}
                                    onChange={(e) => setLoan1({ ...loan1, tenure: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block md:text-lg text-[12px]">Loan 2 Tenure (Months)</label>
                                <input
                                    type="number"
                                    value={loan2.tenure}
                                    onChange={(e) => setLoan2({ ...loan2, tenure: e.target.value })}
                                    className="w-full p-1 md:p-2  border border-gray-300 text-gray-800 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleCompare}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4  md:py-2 rounded-md"
                            >
                                Compare
                            </button>
                            <button
                                onClick={handleClear}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                            >
                                Clear
                            </button>
                            {/* <button
                                className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600"
                                onClick={closeComparePopup}
                            >
                                Close
                            </button> */}

                        </div>

                        <div className="mt-1 mb-7 md:mt-6 bg-white text-gray-800 md:p-4 p-2 rounded-lg">
                            <h3 className="text-center text-lg font-bold">Results</h3>
                            <div className="grid grid-cols-2 gap-2 md:gap-4 text-center mt-4 md:mt-0">
                                <div>
                                    <h4 className="font-bold">Loan 1</h4>
                                    <p className="text-[12px] md:text-lg">EMI: {results.emi1.toFixed(2)}</p>
                                    <p className="text-[12px] md:text-lg">Total Interest: {results.totalInterest1.toFixed(2)}</p>
                                    <p className="text-[12px] md:text-lg">Total Payment: {results.totalPayment1.toFixed(2)}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold">Loan 2</h4>
                                    <p className="text-[12px] md:text-lg">EMI: {results.emi2.toFixed(2)}</p>
                                    <p className="text-[12px] md:text-lg">Total Interest: {results.totalInterest2.toFixed(2)}</p>
                                    <p className="text-[12px] md:text-lg">Total Payment: {results.totalPayment2.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-1 md:mt-4 text-center mb-20">
                                <p className="font-bold text-red-500">Difference</p>
                                <p className="text-[12px] md:text-lg">EMI Difference: {(results.emi1 - results.emi2).toFixed(2)}</p>
                                <p className="text-[12px] md:text-lg">Total Interest Difference: {(results.totalInterest1 - results.totalInterest2).toFixed(2)}</p>
                                <p className="text-[12px] md:text-lg">Total Payment Difference: {(results.totalPayment1 - results.totalPayment2).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default CompareLoanCalculator;
