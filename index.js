import express from 'express';

const app = express();
const fake_database = "fake db...";
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Docker!');
});

app.listen(port, () => {
  console.log(`Fucking server running at http://localhost:${port}`);
});
