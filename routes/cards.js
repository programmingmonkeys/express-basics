const express = require('express')
const router = express.Router()
const eyes = require('eyespect')
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/:id', (req, res) => {
  eyes.inspect(req.query, 'req.query')

  const { side } = req.query
  const { id } = req.params
  const text = cards[id][side]
  const { hint } = cards[id]

  const templateData = { id, text }

  if (side === 'question') {
    templateData.hint = hint
    templateData.sideToShow = 'answer'
  }

  if (side === 'answer') templateData.sideToShow = 'question'

  res.render('card', templateData)
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
