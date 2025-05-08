import { useState } from "react";
import { useScanner } from "../ScannerContext";

function ScannerComponent() {
  const [scanValue, setScanValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scannerContext = useScanner();

  const onScan = async () => {
    if (scanValue.trim()) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      scannerContext.handleScan(scanValue);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onScan();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    const validValue = value.replace(/[^A-Z0-9]/g, "");
    setScanValue(validValue);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={scanValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter tracking number"
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase disabled:opacity-50 disabled:bg-gray-100"
        />
        <button
          onClick={onScan}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          Scan
        </button>
      </div>
      {isLoading && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Validating tracking number...</span>
        </div>
      )}
    </div>
  );
}

export default ScannerComponent;
