import express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  return res.send('mun');
});

export default app;
