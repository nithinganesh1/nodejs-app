const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('He js Test! done!!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on http://localhost:${port}`);
});


