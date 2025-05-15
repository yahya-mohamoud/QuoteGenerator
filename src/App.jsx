import React from 'react'
import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [quote, setQuote] = useState(null)

  const fetchQoute = async () => {
    try {
      const res = await fetch("https://api.quotable.io/random")
      const data = await res.json()
      setQuote(data)
    } catch (error) {
      console.error("error message: " + error);
    }
  }

  useEffect(()=> {
    fetchQoute()
  }, [])


  return (
    <div className="container">
        <h1>Quote Generator</h1>
        {quote && (
          <div className='card'>
            <p>{quote.content}</p>
            <p>{quote.author}</p>
            <button onClick={fetchQoute}>Get Quote</button>
          </div>
        )}
    </div>
)
}

export default App