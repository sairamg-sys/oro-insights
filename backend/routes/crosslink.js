const express = require('express')
const router = express.Router()

router.post('/join', (req, res) => {
  res.json({ result: [], message: 'CrossLink Studio: configure data sources in Settings' })
})

router.get('/sources', (req, res) => {
  res.json({ sources: [], message: 'No data sources configured' })
})

module.exports = router
