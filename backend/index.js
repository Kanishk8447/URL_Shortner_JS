// backend/index.js

const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory URL store
const urlDatabase = {};

// Base URL for shortened URLs
const baseUrl = `http://localhost:${PORT}`; // Use PORT variable for consistency

// Endpoint to shorten URL
app.post('/api/shorten', (req, res) => {
  let { longUrl } = req.body;

  // Check if longUrl starts with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(longUrl)) {
    longUrl = `http://${longUrl}`;
  }

  // Generate short code
  const urlCode = shortid.generate();

  // Create short URL
  const shortUrl = `${baseUrl}/${urlCode}`;

  // Store the URL mapping
  urlDatabase[urlCode] = longUrl;

  // Return the short URL
  res.json({ shortUrl });
});

// Endpoint to redirect to the original URL
app.get('/:code', (req, res) => {
  const { code } = req.params;
  const longUrl = urlDatabase[code];

  if (longUrl) {
    // Redirect to the original URL
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: 'No URL found' });
  }
});

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to URL Shortener API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
