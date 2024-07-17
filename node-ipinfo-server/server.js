const express = require('express');
const { IPinfoWrapper } = require('node-ipinfo');
const cors = require('cors');

const app = express();
const port = 3001; // Vous pouvez choisir un autre port si nécessaire

// const ipinfo = new Ipinfo('312c76b880fe32'); // Remplacez par votre token IPinfo
const ipinfo = new IPinfoWrapper("312c76b880fe32"); // Remplacez par votre token IPinfo

app.use(cors());

app.get('/api/ipinfo/:ip', async (req, res) => {
  try {
    const ip = req.params.ip;
    const info = await ipinfo.lookupIp(ip);
    res.json(info);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${ port }`);
});
