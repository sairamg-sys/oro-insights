const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/ai',        require('./routes/ai'));
app.use('/api/bigquery',  require('./routes/bigquery'));
app.use('/api/cloudsql',  require('./routes/cloudsql'));
app.use('/api/crosslink', require('./routes/crosslink'));
app.use('/api/metabase',  require('./routes/metabase'));
app.use('/api/sheets',    require('./routes/sheets'));

// ── Serve React build ─────────────────────────────────────────────────────────
const DIST = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(DIST));
app.get('*', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));

// ── Error handler ─────────────────────────────────────────────────────────────
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => console.log(`Oro Insights running on port ${PORT}`));

module.exports = app;
