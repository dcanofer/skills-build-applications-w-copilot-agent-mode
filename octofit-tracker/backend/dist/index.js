import express from 'express';
import database from './config/database.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        database: database.name || 'mongodb',
    });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});
