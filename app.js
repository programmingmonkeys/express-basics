const express = require('express')
const eyes = require('eyespect')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const name = req.cookies.username

  res.render('index', { name })
})

app.get('/cards', (req, res) => {
  eyes.inspect(res.locals, 'res.locals')

  res.render('card', {
    prompt: `Who is buried in Grant's tomb?`,
  })
})

app.get('/hello', (req, res) => {
  res.render('hello', {
    name: req.cookies.username,
  })
})

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/')
})

app.listen(3000, () => console.log('The app is running on port 3000'))
