const express = require('express')
const router = express.Router()

router.get('/status', (req, res) => {
  res.json({ status: 'CloudSQL not configured', connected: false })
})

router.get('/tables', (req, res) => {
  res.json({ tables: [], message: 'Configure CloudSQL credentials in Settings' })
})

module.exports = router
