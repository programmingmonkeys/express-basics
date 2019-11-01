const express = require('express')
const eyes = require('eyespect')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const name = req.cookies.username

  if (name) return res.render('index', { name })

  res.redirect('/hello')
})

app.get('/cards', (req, res) => {
  eyes.inspect(res.locals, 'res.locals')

  res.render('card', {
    prompt: `Who is buried in Grant's tomb?`,
  })
})

app.get('/hello', (req, res) => {
  const name = req.cookies.username

  if (name) return res.redirect('/')

  res.render('hello')
})

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/')
})

app.post('/goodbye', (req, res) => {
  res.clearCookie('username')
  res.redirect('/hello')
})

app.listen(3000, () => console.log('The app is running on port 3000'))
