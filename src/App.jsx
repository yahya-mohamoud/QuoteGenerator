import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchQuote = async () => {
    try {
      if (quote) {
        // Save the current quote in history before fetching a new one
        setHistory(prevHistory => [...prevHistory, quote]);
      }

      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error('error message: ' + error);
    }
  };

  const goBack = () => {
    if (history.length === 0) return;

    const lastQuote = history[history.length - 1];
    setQuote(lastQuote);
    setHistory(prevHistory => prevHistory.slice(0, -1)); // Remove last quote
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <h1>Quote Generator</h1>
      {quote && (
        <div className="card">
          <p>{quote.content}</p>
          <p>— {quote.author}</p>
          <div className="buttons">
            <button onClick={fetchQuote}>Get Quote</button>
            <button onClick={goBack} disabled={history.length === 0}>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
