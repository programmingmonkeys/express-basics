const express = require('express')
const router = express.Router()
const eyes = require('eyespect')
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/', (req, res) => res.redirect(`/cards/${randomizer(cards)}`))

router.get('/:id', (req, res) => {
  eyes.inspect(req.query, 'req.query')

  const { side } = req.query

  let { id } = req.params
  if (typeof id !== 'number') id = randomizer(cards)

  if (!side) return res.redirect(`/cards/${id}?side=question`)

  const name = req.cookies.username
  const text = cards[id][side]
  const { hint } = cards[id]

  const templateData = { id, text, name }

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

function randomizer(cards) {
  const numberOfCards = cards.length
  return Math.floor(Math.random() * numberOfCards)
}
