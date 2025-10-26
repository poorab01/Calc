import React, { useState } from 'react';

// The main App component for the calculator.
const App = () => {
    // State to store the input values.
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    // State to store the calculation results.
    const [results, setResults] = useState(null);
    // State for displaying an error message.
    const [error, setError] = useState('');

    /**
     * Converts a decimal value in inches to a string representation with a whole number
     * and a decimal representing eighths of an inch.
     * @param {number} decimalInches The decimal value of inches.
     * @returns {string} The formatted string in 'X.Y' format where Y is eighths.
     */
    const toDecimalEighths = (decimalInches) => {
        if (typeof decimalInches !== 'number' || isNaN(decimalInches)) {
            return '';
        }
        const wholeInches = Math.floor(decimalInches);
        const fractionalPart = decimalInches - wholeInches;
        const numerator = Math.round(fractionalPart * 8);
        return `${wholeInches}.${numerator}`;
    };

    /**
     * Handles the calculation logic when the button is clicked.
     * It validates inputs, performs calculations, and updates the state.
     */
    const handleCalculate = () => {
        const totalWidth = parseFloat(width);
        const totalHeight = parseFloat(height);

        // Input validation
        if (isNaN(totalWidth) || isNaN(totalHeight) || totalWidth <= 0 || totalHeight <= 0) {
            setError('Please enter valid, positive numbers for both width and height.');
            setResults(null);
            return;
        }

        // Clear any previous error messages
        setError('');

        // --- Frame Dimensions (based on total opening) ---
        const topBottomTrackLength = totalWidth;
        const sideTrackLength = totalHeight;

        // --- Shutter Dimensions (for 2 shutters) ---
        // Rule: Height of handle/interlock is total height minus 1.5 inches
        const handleInterlockPipeLength = totalHeight - 1.5;

        // Rule: Top/bearing bottom is total width minus 6.25 inches, divided by 2 for the two shutters
        const topBearingBottomLength = (totalWidth - 6.25) / 2;

        // --- Glass Dimensions (for 2 panes) ---
        // Rule: Glass height is handle/interlock height minus 3 inches
        const glassHeight = handleInterlockPipeLength - 3;

        // Rule: Glass width is top/bearing bottom length plus 0.5 inches
        const glassWidth = topBearingBottomLength + 0.5;

        // Set the results in state
        setResults({
            topBottomTrack: toDecimalEighths(topBottomTrackLength),
            sideTrack: toDecimalEighths(sideTrackLength),
            handleInterlock: toDecimalEighths(handleInterlockPipeLength),
            topBearingBottom: toDecimalEighths(topBearingBottomLength),
            glassDimensions: `${toDecimalEighths(glassWidth)} (Width) x ${toDecimalEighths(glassHeight)} (Height)`
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-12 border border-gray-200">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2">
                    Aluminum Window Calculator
                </h1>
                <p className="text-center text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base">
                    Enter the total window opening size in inches to calculate component dimensions.
                </p>

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                            Total Window Width (inches)
                        </label>
                        <input
                            type="number"
                            id="width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="e.g., 72.5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out text-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                            Total Window Height (inches)
                        </label>
                        <input
                            type="number"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g., 48.25"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out text-gray-800"
                        />
                    </div>
                </div>

                {/* Calculation Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleCalculate}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105 duration-200"
                    >
                        Calculate Dimensions
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Results Section */}
                {results && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Component Dimensions
                        </h2>
                        {/* Frame Components */}
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-inner">
                            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                Frame Dimensions
                            </h3>
                            <ul className="text-gray-700 list-disc list-inside space-y-2">
                                <li>
                                    <span className="font-semibold">Top & Bottom Track:</span> <span className="font-mono text-gray-900">{results.topBottomTrack}</span>
                                </li>
                                <li>
                                    <span className="font-semibold">Side Track (2 pcs):</span> <span className="font-mono text-gray-900">{results.sideTrack}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Shutter Components */}
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-inner">
                            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                                Shutter Dimensions (for 2 Shutters)
                            </h3>
                            <ul className="text-gray-700 list-disc list-inside space-y-2">
                                <li>
                                    <span className="font-semibold">Handle Pipe & Interlock Pipe:</span> <span className="font-mono text-gray-900">{results.handleInterlock}</span>
                                </li>
                                <li>
                                    <span className="font-semibold">Top Pipe & Bearing Bottom:</span> <span className="font-mono text-gray-900">{results.topBearingBottom}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Glass Dimensions */}
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-inner">
                            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                Glass Dimensions (for 2 Panes)
                            </h3>
                            <ul className="text-gray-700 list-disc list-inside space-y-2">
                                <li>
                                    <span className="font-semibold">Glass Panes:</span> <span className="font-mono text-gray-900">{results.glassDimensions}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
