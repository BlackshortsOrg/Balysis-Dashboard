"use client";
import React, { useState, useEffect } from "react";

//* Add API endpoint here
const API_ENDPOINT = "";

const Variable = () => {
  // State to store variable data from the API
  const [variables, setVariables] = useState([
    { name: 'symbol', label: 'Stock Symbol', defaultValue: 'AAPL' },
    { name: 'price', label: 'Current Price', defaultValue: '150.00' },
    { name: 'volume', label: 'Trading Volume', defaultValue: '5000000' },
    { name: 'marketCap', label: 'Market Cap', defaultValue: '2.5T' },
    // Add more variables as needed
  ]);
  
  // State to store form values
  const [formValues, setFormValues] = useState({});

  /**
   * This will fetch data on mount
   * add this once we have api ready
   */
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(API_ENDPOINT);
  //         const data = await response.json();
  //         setVariables(data);
  //       } catch (error) {
  //         console.error('Error fetching variable data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // Handle form input changes
  const handleInputChange = (variableName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [variableName]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any action with the form values (e.g., submit to the server)
    console.log("Form submitted with values:", formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {variables.map((variable) => (
          <div key={variable.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              {variable.label}
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formValues[variable.name] || variable.defaultValue}
              onChange={(e) => handleInputChange(variable.name, e.target.value)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Variable;
