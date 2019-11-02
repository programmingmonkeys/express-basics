const express = require('express')
const router = express.Router()
const eyes = require('eyespect')
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/:id', (req, res) => {
  res.render('card', {
    prompt: cards[req.params.id].question,
    hint: cards[req.params.id].hint,
  })
})

// Sample testing req.params
router.get('/:foo/:bar', (req, res) => {
  eyes.inspect(req.params, 'req.params') // http://expressjs.com/en/api.html#req.params

  res.render('card', {
    prompt: cards[req.params.foo].question,
    hint: cards[req.params.bar].hint,
  })
})

module.exports = router
