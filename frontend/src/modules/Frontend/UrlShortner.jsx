import React, { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  // Updated handleShortenUrl function
  const handleShortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      console.log(data);

      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container text-center mt-5 bg-white p-5 rounded">
      <h2 className="text-2xl font-bold text-black">URL Shortener</h2>
      <h3 className="font-bold text-black">Paste the URL to be shortened</h3>
      <div className="m-3 p-4 w-100">
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="form-control"
        />
      </div>
      <button
        onClick={handleShortenUrl}
        className="btn-primary px-4 py-2 "
      >
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg">
            Short URL:{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex"
            >
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
