const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

const getBigQueryClient = (credentials, projectId) => {
  const creds = typeof credentials === 'string' ? JSON.parse(credentials) : credentials;
  return new BigQuery({ credentials: creds, projectId: projectId || creds.project_id });
};

// POST /api/bigquery/test - Test connection
router.post('/test', asyncHandler(async (req, res) => {
  const { credentials, projectId } = req.body;
  const bq = getBigQueryClient(credentials, projectId);
  const [datasets] = await bq.getDatasets({ maxResults: 1 });
  res.json({ success: true, projectId: bq.projectId, datasetCount: datasets.length });
}));

// POST /api/bigquery/datasets - List all datasets
router.post('/datasets', asyncHandler(async (req, res) => {
  const { credentials, projectId } = req.body;
  const bq = getBigQueryClient(credentials, projectId);
  const [datasets] = await bq.getDatasets();

  const result = datasets.map(d => ({
    id: d.id,
    datasetId: d.id,
    projectId: d.bigQuery.projectId,
    location: d.metadata?.location,
    created: d.metadata?.creationTime,
    description: d.metadata?.description
  }));

  res.json({ datasets: result, total: result.length });
}));

// POST /api/bigquery/tables - List tables in a dataset
router.post('/tables', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId } = req.body;
  const bq = getBigQueryClient(credentials, projectId);
  const dataset = bq.dataset(datasetId);
  const [tables] = await dataset.getTables();

  const result = tables.map(t => ({
    id: t.id,
    tableId: t.id,
    datasetId,
    projectId: bq.projectId,
    type: t.metadata?.type,
    created: t.metadata?.creationTime,
    numRows: t.metadata?.numRows,
    numBytes: t.metadata?.numBytes,
    description: t.metadata?.description
  }));

  res.json({ tables: result, total: result.length });
}));

// POST /api/bigquery/schema - Get table schema
router.post('/schema', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId, tableId } = req.body;
  const bq = getBigQueryClient(credentials, projectId);
  const [metadata] = await bq.dataset(datasetId).table(tableId).getMetadata();

  res.json({
    tableId,
    datasetId,
    projectId: bq.projectId,
    schema: metadata.schema?.fields || [],
    numRows: metadata.numRows,
    numBytes: metadata.numBytes,
    created: metadata.creationTime,
    modified: metadata.lastModifiedTime,
    description: metadata.description,
    labels: metadata.labels
  });
}));

// POST /api/bigquery/preview - Preview table rows
router.post('/preview', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId, tableId, limit = 100 } = req.body;
  const bq = getBigQueryClient(credentials, projectId);
  const [rows] = await bq.dataset(datasetId).table(tableId).getRows({ maxResults: limit });

  res.json({ rows, total: rows.length });
}));

// POST /api/bigquery/query - Execute a SQL query
router.post('/query', asyncHandler(async (req, res) => {
  const { credentials, projectId, sql, params = {} } = req.body;
  const bq = getBigQueryClient(credentials, projectId);

  const options = { query: sql, params, location: 'US', useLegacySql: false };
  const [rows] = await bq.query(options);

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  res.json({ columns, rows, total: rows.length });
}));

// POST /api/bigquery/create-table - Create a new table from data
router.post('/create-table', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId, tableId, schema, rows, description } = req.body;
  const bq = getBigQueryClient(credentials, projectId);

  const tableOptions = {
    schema,
    description: description || `Created by Oro Insights on ${new Date().toISOString()}`,
    labels: { source: 'oro-insights', created_by: 'crosslink-studio' }
  };

  const [table] = await bq.dataset(datasetId).createTable(tableId, tableOptions);

  if (rows && rows.length > 0) {
    await table.insert(rows);
  }

  res.json({
    success: true,
    tableId,
    datasetId,
    projectId: bq.projectId,
    fullTableId: `${bq.projectId}.${datasetId}.${tableId}`,
    rowsInserted: rows?.length || 0,
    message: `Table ${tableId} created successfully in ${datasetId}`
  });
}));

// POST /api/bigquery/insert - Insert rows into existing table
router.post('/insert', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId, tableId, rows } = req.body;
  const bq = getBigQueryClient(credentials, projectId);

  await bq.dataset(datasetId).table(tableId).insert(rows);

  res.json({ success: true, rowsInserted: rows.length });
}));

// POST /api/bigquery/drop-table - Drop a table
router.post('/drop-table', asyncHandler(async (req, res) => {
  const { credentials, projectId, datasetId, tableId } = req.body;
  const bq = getBigQueryClient(credentials, projectId);

  await bq.dataset(datasetId).table(tableId).delete();

  res.json({ success: true, message: `Table ${tableId} deleted` });
}));

module.exports = router;
