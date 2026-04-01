const express = require('express')
const router = express.Router()

router.get('/questions', (req, res) => {
  res.json({ questions: [], message: 'Configure Metabase URL and credentials in Settings' })
})

router.get('/dashboards', (req, res) => {
  res.json({ dashboards: [], message: 'Configure Metabase URL and credentials in Settings' })
})

module.exports = router
