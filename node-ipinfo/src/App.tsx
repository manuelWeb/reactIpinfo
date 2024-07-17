import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState(null);

  const handleFetchInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/ipinfo/${ip}`);
      setInfo(response.data);
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
  };

  return (
    <div>
      <h1>IP Info Lookup</h1>
      <pre><code>
        // Example: 90.80.194.140
      </code></pre>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP address"
      />

      <button onClick={handleFetchInfo}>Get Info</button>
      {info && (
        <div>
          <h2>Information for IP: {ip}</h2>
          <pre style={{ textAlign: 'left' }}>
            <code>
              {JSON.stringify(info, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default App
