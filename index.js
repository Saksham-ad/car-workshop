
const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('.'));
app.use(express.json());

// Authentication middleware
app.get('/api/user', (req, res) => {
  const user = req.headers['x-user-data'];
  res.json(user ? JSON.parse(user) : null);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
