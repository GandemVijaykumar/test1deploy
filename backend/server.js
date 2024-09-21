// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',  // Enable CORS for all origins
  methods: ['GET', 'POST']
}));

// POST /bfhl - Handles JSON input, processes data, returns response
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input, expected an array'
    });
  }

  const user_id = 'john_doe_17091999';
  const email = 'john@xyz.com';
  const roll_number = 'ABCD123';
  const numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item.toString());  // Ensure numbers are strings
    } else if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highest_alphabet = alphabets.length
    ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
    : [];

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  });
});

// GET /bfhl - Returns operation code
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
