import express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  return res.send('muns2');
});

export default app;
