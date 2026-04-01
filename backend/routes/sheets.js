const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.json({ sheets: [], message: 'Configure Google OAuth credentials in Settings' })
})

router.get('/callback', (req, res) => {
  res.json({ message: 'OAuth callback - configure credentials in Settings' })
})

router.get('/data/:sheetId', (req, res) => {
  res.json({ data: [], message: 'Configure Google OAuth credentials in Settings' })
})

module.exports = router
