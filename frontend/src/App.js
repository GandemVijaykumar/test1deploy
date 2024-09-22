import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  // Dropdown options
  const options = [
    { label: 'Alphabets', value: 'alphabets' },
    { label: 'Numbers', value: 'numbers' },
    { label: 'Highest Lowercase Alphabet', value: 'highest_lowercase_alphabet' }
  ];

  // Set the page title to the user's roll number
  useEffect(() => {
    document.title = 'AP21110011507';
  }, []);

  // Handle JSON input change
  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle submit button click
  const handleSubmit = async () => {
    try {
      setError('');
      const parsedData = JSON.parse(jsonInput); // Validate JSON input
      const res = await axios.post('https://bajajbackend-flax.vercel.app/bfhl', parsedData);
      setResponseData(res.data);
    } catch (error) {
      setError('Invalid JSON input or API call failed');
    }
  };

  // Handle multi-select dropdown change
  const handleDropdownChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedOptions(selected);
  };

  // Render the filtered response data based on dropdown selection
  const renderFilteredResponse = () => {
    if (!responseData) return null;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      filteredResponse[option] = responseData[option];
    });
    return JSON.stringify(filteredResponse, null, 2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>REST API Client</h1>
      <textarea
        placeholder='Enter JSON input here'
        value={jsonInput}
        onChange={handleJsonInputChange}
        rows={8}
        cols={50}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
        Submit
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <br />
      {responseData && (
        <>
          <label htmlFor='dropdown'>Select options to display:</label>
          <br />
          <select
            id='dropdown'
            multiple={true}
            value={selectedOptions}
            onChange={handleDropdownChange}
            style={{ marginTop: '10px', padding: '10px', width: '100%' }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <br />
          <h3>Filtered Response:</h3>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{renderFilteredResponse()}</pre>
        </>
      )}
    </div>
  );
}
