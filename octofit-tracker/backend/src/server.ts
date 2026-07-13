import express from 'express';
import database from './config/database.js';
import apiRoutes from './routes/api.js';

const codespaceName = process.env.CODESPACE_NAME?.trim();
const port = 8000;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const app = express();

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
