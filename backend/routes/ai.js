const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

const getAnthropicClient = () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw { status: 400, message: 'ANTHROPIC_API_KEY is not configured. Add it to your .env file.' };
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
};

const SYSTEM_PROMPT = `You are Oro Insights AI, an expert Business Intelligence analyst and data engineer with 20+ years of experience. You help users:

1. **Analyze data** from Metabase (Oro 2.0 - loan data), Quali (appointments/leads), Google Sheets, BigQuery, and Cloud SQL
2. **Generate SQL queries** - always write clean, optimized, well-commented SQL
3. **Create insights** - provide actionable business insights with clear explanations
4. **Build dashboards** - suggest KPIs, chart types, and layouts
5. **Cross-link data** - help join loan data with appointment/lead data for unified analysis

When writing SQL:
- Always use explicit column names (no SELECT *)
- Add helpful comments
- Consider performance (use LIMIT for previews)
- Suggest indexes when relevant

For Metabase datasets available:
- **Oro 2.0** (loans): loan_id, customer_id, loan_amount, interest_rate, tenure, disbursement_date, status, product_type, branch, agent_id, emi_amount, outstanding_balance
- **Quali** (appointments/leads): lead_id, customer_id, appointment_id, appointment_date, status, lead_source, agent_id, product_interest, conversion_status, created_at

Always be concise, actionable, and data-driven in your responses. Format SQL in code blocks.`;

// POST /api/ai/chat - Main AI chat endpoint
router.post('/chat', asyncHandler(async (req, res) => {
  const { messages, context, apiKey } = req.body;

  const client = apiKey
    ? new Anthropic({ apiKey })
    : getAnthropicClient();

  const systemWithContext = context
    ? `${SYSTEM_PROMPT}\n\n**Current Data Context:**\n${JSON.stringify(context, null, 2)}`
    : SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    system: systemWithContext,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content
    }))
  });

  res.json({
    content: response.content[0].text,
    usage: response.usage,
    model: response.model
  });
}));

// POST /api/ai/generate-sql - Generate SQL from natural language
router.post('/generate-sql', asyncHandler(async (req, res) => {
  const { prompt, schema, dialect = 'standard SQL', apiKey } = req.body;

  const client = apiKey ? new Anthropic({ apiKey }) : getAnthropicClient();

  const schemaContext = schema
    ? `\n\nAvailable Schema:\n${JSON.stringify(schema, null, 2)}`
    : '';

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Generate a ${dialect} query for: ${prompt}${schemaContext}

Return ONLY a JSON object with this structure:
{
  "sql": "your SQL query here",
  "explanation": "brief explanation of what this query does",
  "columns": ["list", "of", "output", "columns"],
  "estimated_rows": "rough estimate like 'hundreds' or 'thousands'"
}`
    }]
  });

  try {
    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);
    res.json(parsed);
  } catch (e) {
    res.json({ sql: response.content[0].text, explanation: '', columns: [] });
  }
}));

// POST /api/ai/generate-insight - Generate insight from data
router.post('/generate-insight', asyncHandler(async (req, res) => {
  const { data, title, context, apiKey } = req.body;

  const client = apiKey ? new Anthropic({ apiKey }) : getAnthropicClient();

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Analyze this data and generate business insights:

Title: ${title || 'Data Analysis'}
Context: ${context || 'Business Intelligence Dashboard'}

Data Sample (${data?.rows?.length || 0} rows):
Columns: ${data?.columns?.join(', ')}
Sample rows: ${JSON.stringify(data?.rows?.slice(0, 10), null, 2)}

Provide:
1. Key findings (3-5 bullet points)
2. Trends or patterns observed
3. Actionable recommendations (2-3)
4. Suggested follow-up analyses
5. Suggested chart type for this data

Be specific with numbers when available.`
    }]
  });

  res.json({ insight: response.content[0].text });
}));

// POST /api/ai/suggest-dashboard - Suggest dashboard layout
router.post('/suggest-dashboard', asyncHandler(async (req, res) => {
  const { requirement, availableData, apiKey } = req.body;

  const client = apiKey ? new Anthropic({ apiKey }) : getAnthropicClient();

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 3000,
    messages: [{
      role: 'user',
      content: `Design a BI dashboard for this requirement:

Requirement: ${requirement}
Available Data Sources: ${JSON.stringify(availableData)}

Return a JSON dashboard specification:
{
  "title": "Dashboard Title",
  "description": "What this dashboard shows",
  "kpis": [
    { "title": "KPI Name", "query": "SQL to compute it", "format": "number|currency|percent", "description": "What it means" }
  ],
  "charts": [
    { "title": "Chart Title", "type": "bar|line|pie|area|scatter", "query": "SQL query", "x_axis": "column", "y_axis": "column", "description": "insight" }
  ],
  "tables": [
    { "title": "Table Title", "query": "SQL query", "description": "What this table shows" }
  ],
  "filters": ["suggested filter columns"],
  "refresh_interval": "daily|hourly|realtime"
}`
    }]
  });

  try {
    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);
    res.json({ dashboard: parsed });
  } catch (e) {
    res.json({ dashboard: null, raw: response.content[0].text });
  }
}));

// POST /api/ai/explain-data - Explain what a dataset contains
router.post('/explain-data', asyncHandler(async (req, res) => {
  const { columns, sampleRows, tableName, apiKey } = req.body;

  const client = apiKey ? new Anthropic({ apiKey }) : getAnthropicClient();

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Explain this dataset in business terms:
Table: ${tableName}
Columns: ${columns?.join(', ')}
Sample Data: ${JSON.stringify(sampleRows?.slice(0, 3))}

Provide a concise explanation of what this table represents and what analyses are possible.`
    }]
  });

  res.json({ explanation: response.content[0].text });
}));

module.exports = router;
