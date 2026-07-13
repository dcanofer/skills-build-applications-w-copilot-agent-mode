import express from 'express';
import database from './config/database.js';
import { getApiConfig } from './config/api.js';
import apiRoutes from './routes/api.js';

export const app = express();
const { port, baseUrl } = getApiConfig();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: database.name || 'mongodb',
    apiBaseUrl: baseUrl,
  });
});

export const startServer = () => {
  return app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on ${baseUrl}`);
  });
};
