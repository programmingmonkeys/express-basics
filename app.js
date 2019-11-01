const express = require('express')
const eyes = require('eyespect')

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index'))

app.get('/cards', (req, res) => {
  eyes.inspect(res.locals, 'res.locals')

  res.render('card', {
    prompt: `Who is buried in Grant's tomb?`,
  })
})

app.get('/hello', (req, res) => {
  res.render('hello')
})

app.post('/hello', (req, res) => {
  res.render('hello')
})

app.listen(3000, () => console.log('The app is running on port 3000'))
