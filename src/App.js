import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(inputData);  // Check if the input is valid JSON
      try {
        const res = await axios.post('http://localhost:8000/bfhl', jsonInput);
        setResponseData(res.data);
        setError('');  // Clear any previous errors
      } catch (apiError) {
        setError('Error in API call');
      }
    } catch (jsonError) {
      setError('Invalid JSON format');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = responseData.alphabets;
    if (selectedOptions.includes('Numbers')) filteredData.numbers = responseData.numbers;
    if (selectedOptions.includes('Highest Alphabet')) filteredData.highest_alphabet = responseData.highest_alphabet;

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Backend API Interaction</h1>
      <textarea
        rows="10"
        cols="50"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter valid JSON input"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>

          <h3>Select Data to Show:</h3>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />{' '}
            Alphabets
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />{' '}
            Numbers
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Highest Alphabet"
              onChange={handleOptionChange}
            />{' '}
            Highest Alphabet
          </label>
          <br />

          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
