import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.get('/task', (req, res) => {
  res.send([
    {
      uuid: 'xxx',
      text: 'Testing',
      isDone: false,
    },
  ]);
});

app.post('/task', (req, res) => {});

app.put('/task/:uuid', (req, res) => {});

app.delete('/task/:uuid', (req, res) => {});

app.listen(port, () => {
  console.log('Call received');
});
