import express from 'express';

const app = express();

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hsellssso');
  }
);

export default app;
