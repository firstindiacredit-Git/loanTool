import React, { useState } from "react";
import EmployeeDashNavigator from "../Components/EmployeeDashNavigator";
import EmployeeDashNavBar from "../Components/EmployeeDashNavBar";
import EmployeeDashNavbarMobile from "../Components/EmployeeDashNavbarMobile";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Notification.css";

import CompareLoanCalculator from "./CompareLoanCalculator";

ChartJS.register(ArcElement, Tooltip, Legend);

function LoanTool() {
    const [showEmiPopup, setShowEmiPopup] = useState(false);
    const [showComparePopup, setShowComparePopup] = useState(false);
    const [principal, setPrincipal] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [tenureType, setTenureType] = useState("months");
    const [processingFee, setProcessingFee] = useState("");
    const [emi, setEmi] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [emiDetails, setEmiDetails] = useState([]); // Array to store EMI breakdown

    const handleEmiButtonClick = () => {
        setShowEmiPopup(true);
    };

    const closeEmiPopup = () => {
        setShowEmiPopup(false);
    };
    const togglePopup = (setter) => () => {
        setter(prevState => !prevState);
    };
    const handleCompareButtonClick = () => {
        setShowComparePopup(true);
    };

    const closeComparePopup = () => {
        setShowComparePopup(false);
    };

    const calculateEmi = () => {
        const P = parseFloat(principal);
        const R = parseFloat(interestRate) / 12 / 100;
        let N = parseInt(tenure);
        const F = parseFloat(processingFee) || 0;

        if (tenureType === "years") {
            N = N * 12;
        }

        if (!P || !R || !N) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalInterest = emi * N - P;
        const totalAmount = P + totalInterest + F;

        setEmi(Math.round(emi));
        setTotalInterest(Math.round(totalInterest));
        setTotalAmount(Math.round(totalAmount));

        // Calculate monthly breakdown of EMI
        const emiDetailsArray = [];
        let remainingPrincipal = P;

        for (let i = 1; i <= N; i++) {
            const interestForMonth = remainingPrincipal * R;
            const principalForMonth = emi - interestForMonth;
            remainingPrincipal -= principalForMonth;

            emiDetailsArray.push({
                month: i,
                emi: Math.round(emi),
                interestPaid: Math.round(interestForMonth),
                principalPaid: Math.round(principalForMonth),
                remainingPrincipal: Math.round(remainingPrincipal),
            });
        }

        setEmiDetails(emiDetailsArray);
    };

    const pieData = {
        labels: ["Principal", "Total Interest", "Processing Fee"],
        datasets: [
            {
                data: [parseFloat(principal), parseFloat(totalInterest), parseFloat(processingFee)],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                <EmployeeDashNavigator />
            </aside>
            <div className="p-4 xl:ml-80">
                <div className="hidden md:block">
                    <EmployeeDashNavBar />
                </div>
                <div className="block md:hidden">
                    <EmployeeDashNavbarMobile />
                </div>
                <header className="flex rounded-lg items-center">
                    <img
                        src={`/logo.jpg`}
                        alt="Logo"
                        className="md:h-10 h-7 w-auto rounded-lg mb-6 md:ml-4 ml-4"
                    />
                    <h1 className="text-xl md:text-3xl ml-10 mb-6 md:m-auto font-semibold text-gray-800">
                        Loan Tools
                    </h1>
                </header>

                <div className="min-h-screen gap-2 mb-7 bg-white shadow-lg p-[7px] rounded-lg">
                    {!showEmiPopup && (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 mb-4"
                            onClick={handleEmiButtonClick}
                        >

                            Emi Calculator
                        </button>
                    )}
                    {!showComparePopup && (
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 mb-4"
                            onClick={togglePopup(setShowComparePopup)}
                        >
                            Compare Loan
                        </button>
                    )}



                    {showEmiPopup && (
                        <div className="flex inset-0 z-50 items-center justify-center mb-6 bg-white bg-opacity-50">
                            <div className="bg-white p-2 rounded-xl shadow-lg lg-w-[50%] w-full max-w-md">
                                <h2 className="text-2xl font-semibold mb-4">EMI Calculator</h2>

                                <div className="mb-4">
                                    <label className="block mb-2">Principal Amount (P):</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={principal}
                                        onChange={(e) => setPrincipal(e.target.value)}
                                        placeholder="Enter loan amount"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Annual Interest Rate (%):</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="Enter interest rate"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Period:</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            className="w-full p-2 border rounded-lg mr-2 focus:ring-2 focus:ring-blue-500"
                                            value={tenure}
                                            onChange={(e) => setTenure(e.target.value)}
                                            placeholder="Enter tenure"
                                        />
                                        <select
                                            value={tenureType}
                                            onChange={(e) => setTenureType(e.target.value)}
                                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="months">Months</option>
                                            <option value="years">Years</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Processing Fee (₹):</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={processingFee}
                                        onChange={(e) => setProcessingFee(e.target.value)}
                                        placeholder="Enter processing fee (optional)"
                                    />
                                </div>

                                <div>
                                    {emi && (
                                        <div className="mb-4">
                                            <hr className="text-bold text-2xl mb-2" />
                                            <h3 className="text-semibold text-2xl">RESULT</h3>
                                            <div className="p-4 border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto">
                                                <h3 className="text-xl font-semibold mb-4">Your EMI</h3>
                                                <table className="w-full border border-gray-300 rounded-md">
                                                    <tbody>
                                                        <tr className="border-b border-gray-300 rounded-md">
                                                            <td className="py-2 px-4 font-medium border-r rounded-md border-gray-300">EMI:</td>
                                                            <td className="py-2 px-4 border-gray-300">₹{emi}</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-300">
                                                            <td className="py-2 px-4 font-medium border-r border-gray-300">Total Interest Payable:</td>
                                                            <td className="py-2 px-4">₹{totalInterest}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-medium border-r border-gray-300">Total Amount Payable:</td>
                                                            <td className="py-2 px-4">₹{totalAmount}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-4">
                                                    <Pie data={pieData} />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-semibold mt-6 mb-4">EMI Breakdown (Monthly):</h3>
                                            <div className="w-full overflow-x-auto">
                                                <table className="min-w-full border-collapse border border-gray-300">
                                                    <thead>
                                                        <tr>
                                                            <th className="border text-[12px] md:text-lg border-gray-300 px-1 py-1">Month</th>
                                                            {/* <th className="border border-gray-300 px-4 py-2">EMI</th> */}
                                                            <th className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">Interest Paid</th>
                                                            <th className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">Principal Paid</th>
                                                            <th className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">Remaining Principal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {emiDetails.map((detail) => (
                                                            <tr key={detail.month}>
                                                                <td className="border text-[12px] md:text-lg border-gray-300 px-1 py-1">{detail.month}</td>
                                                                {/* <td className="border border-gray-300 px-2 py-2">₹{detail.emi}</td> */}
                                                                <td className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">₹{detail.interestPaid}</td>
                                                                <td className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">₹{detail.principalPaid}</td>
                                                                <td className="border text-[12px] md:text-lg border-gray-300 px-2 py-2">₹{detail.remainingPrincipal}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={calculateEmi}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                                    >
                                        Calculate EMI
                                    </button>
                                    <button
                                        onClick={closeEmiPopup}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showComparePopup && (
                        <div className="flex inset-0 z-50 items-center justify-center mb-6 bg-white bg-opacity-50">
                            <div className="bg-white p-2 rounded-xl shadow-lg lg-w-[50%] w-full max-w-md">
                                <CompareLoanCalculator />
                                <button
                                    onClick={togglePopup(setShowComparePopup)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-[200px] shadow-md hover:bg-red-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoanTool;
