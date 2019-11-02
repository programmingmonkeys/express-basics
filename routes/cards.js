const express = require('express')
const router = express.Router()
const eyes = require('eyespect')

router.get('/', (req, res) => {
  eyes.inspect(res.locals, 'res.locals')

  res.render('card', {
    prompt: `Who is buried in Grant's tomb?`,
  })
})

module.exports = router
