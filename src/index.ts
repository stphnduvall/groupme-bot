const https = require('https')
require('dotenv').config({path: '/home/stephen_duvall13/Daily\ Dad\ Joke/.env'});

const get_options = {
  hostname: 'icanhazdadjoke.com',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}

const req = https.request(get_options, (res) => {
  console.log(`get statuscode: ${res.statusCode}`)

  res.on('data', (d) => {
    joke = JSON.parse(d)
    sendMessage(joke['joke'])
  })
})

req.on('error', (error) => {
  console.log(error)
})

req.end()

function sendMessage(joke) {
  console.log(joke)
  console.log (`bot_id ${process.env.BOT_ID}`)
  const data = JSON.stringify({
    'bot_id': process.env.BOT_ID,
    'text': joke
  })

  const post_options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const post_req = https.request(post_options, (res) => {
    console.log(`post statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  post_req.on('error', (error) => {
    console.log(error)
  })

  post_req.write(data)
  post_req.end()
}
