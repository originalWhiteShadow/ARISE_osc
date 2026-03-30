const express = require('express')
const path = require('path')

// Minimal static server to serve built assets from `dist/`.
const app = express()
const port = process.env.PORT || 3000

const dist = path.join(__dirname, '..', 'dist')
app.use(express.static(dist))

// Serve index.html for any route (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
